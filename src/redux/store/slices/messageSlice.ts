import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { apiGetMessageChats, apiCreateMessageChat } from '@/services/MessageService'
import { RootState } from "@/redux/store";
import { Message } from "@prisma/client";

export interface messageState {
    loading: boolean;
    loadingAction: boolean;
    messageChats: Message[] | undefined;
    error: string | undefined;
}

const initialState: messageState = {
    loading: false,
    loadingAction: false,
    messageChats: [],
    error: undefined,
}

export const getMessageChatsList = createAsyncThunk(
    "message/listMessageChats",
    async () => {
        const response: any = await apiGetMessageChats()
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


export const messageChat = createSlice({
    name: "messageChat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMessageChatsList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMessageChatsList.fulfilled, (state, action: PayloadAction<Array<Message>>) => {
            state.loading = false;
            state.messageChats = action.payload;
        });
        builder.addCase(getMessageChatsList.rejected, (state, action) => {
            state.loading = false;
            state.messageChats = [];
            state.error = action.error.message;
        });
        builder.addCase(postAddMessageChat.pending, (state) => {
            state.loadingAction = true;
        });
        builder.addCase(postAddMessageChat.fulfilled, (state, action: PayloadAction<Message>) => {
            state.loadingAction = false;
            state.messageChats?.unshift(action.payload);
        });
        builder.addCase(postAddMessageChat.rejected, (state, action) => {
            state.loadingAction = false;
            state.messageChats = [];
            state.error = action.error.message;
        });
    },
})

// To able to use reducers we need to export them.

export const messageChatsSelector = (state: RootState) => state.messageChatsState;
export default messageChat.reducer