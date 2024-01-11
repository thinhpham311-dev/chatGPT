import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { apiGetMessageChats } from '@/services/MessageService'
import { RootState } from "@/redux/store";

export interface messageBotState {
    loading: boolean;
    loadingAction: boolean;
    messageChatBot: Object | null;
    error: string | undefined;
}

const initialState: messageBotState = {
    loading: false,
    loadingAction: false,
    messageChatBot: [],
    error: undefined,
}

export const postAddMessageChatBot = createAsyncThunk(
    "message/listMessageChats",
    async () => {
        const response: any = await apiGetMessageChats()
        return response.data
    }
)



export const messageChatBot = createSlice({
    name: "messageChat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postAddMessageChatBot.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postAddMessageChatBot.fulfilled, (state, action: PayloadAction<Object>) => {
            state.loading = false;
            state.messageChatBot = action.payload;
        });
        builder.addCase(postAddMessageChatBot.rejected, (state, action) => {
            state.loading = false;
            state.messageChatBot = null;
            state.error = action.error.message;
        });
    },
})

// To able to use reducers we need to export them.

export const messageChatBotSelector = (state: RootState) => state.messageChatBotState;
export default messageChatBot.reducer