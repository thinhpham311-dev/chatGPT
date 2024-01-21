import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { apiGetMessageChatsByConversationCode, apiCreateMessageChat, apiCreateMessageChatBot } from '@/services/MessageService'
import { RootState } from "@/redux/store";
import { Message } from "@prisma/client";

export interface messageState {
    loadingList: boolean;
    loadingAction: boolean;
    messageChats: Message[] | undefined;
    error: string | undefined;
}

const initialState: messageState = {
    loadingList: false,
    loadingAction: false,
    messageChats: [],
    error: undefined,
}

export const getMessageChatsListByConversationCode = createAsyncThunk(
    "message/listMessageChats",
    async (data: Message) => {
        const response: any = await apiGetMessageChatsByConversationCode(data)
        return response.data
    }
)

export const postAddMessageChat = createAsyncThunk(
    "message/addMessageChat",
    async (data: Message) => {
        const response: any = await apiCreateMessageChat(data)
        return response.data
    }
)

export const postAddMessageChatBot = createAsyncThunk(
    "message/addMessageChatBot",
    async (data: Message) => {
        const response: any = await apiCreateMessageChatBot(data)
        return response.data
    }
)



export const messageChat = createSlice({
    name: "messageChat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMessageChatsListByConversationCode.pending, (state) => {
            state.loadingList = true;
        });
        builder.addCase(getMessageChatsListByConversationCode.fulfilled, (state, action: PayloadAction<Array<Message>>) => {
            state.loadingList = false;
            state.messageChats = action.payload;
        });
        builder.addCase(getMessageChatsListByConversationCode.rejected, (state, action) => {
            state.loadingList = false;
            state.messageChats = [];
            state.error = action.error.message;
        });
        builder.addCase(postAddMessageChat.pending, (state) => {
            state.loadingAction = true;
        });
        builder.addCase(postAddMessageChat.fulfilled, (state, action: PayloadAction<Message>) => {
            state.loadingAction = false;
            state.messageChats?.push(action.payload);
        });
        builder.addCase(postAddMessageChat.rejected, (state, action) => {
            state.loadingAction = false;
            state.messageChats = [];
            state.error = action.error.message;
        });
        builder.addCase(postAddMessageChatBot.pending, (state) => {
            state.loadingAction = true;
        });
        builder.addCase(postAddMessageChatBot.fulfilled, (state, action: PayloadAction<Message>) => {
            state.loadingAction = false;
            state.messageChats?.push(action.payload);
        });
        builder.addCase(postAddMessageChatBot.rejected, (state, action) => {
            state.loadingAction = false;
            state.messageChats = [];
            state.error = action.error.message;
        });
    },
})

// To able to use reducers we need to export them.

export const messageChatsSelector = (state: RootState) => state.messageChatsState;
export default messageChat.reducer