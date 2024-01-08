import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { apiGetConversations, apiGetConversation } from '@/services/ConversationService'
import { RootState } from "@/redux/store";
import { Conversation } from "@prisma/client";

export interface conversationState {
    loading: boolean;
    conversations: Conversation[] | undefined;
    conversation: Conversation | null;
    error: string | undefined;
}

const initialState: conversationState = {
    loading: false,
    conversation: null,
    conversations: [],
    error: undefined,
}

export const getConversationsList = createAsyncThunk(
    "conversation/listConversations",
    async () => {
        const response: any = await apiGetConversations()
        return response.data
    }
)

export const getConversationById = createAsyncThunk(
    "conversation/conversationById",
    async (data: Conversation) => {
        const response: any = await apiGetConversation(data)
        return response.data
    }
)


export const conversation = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        createConversation: (state: any, action: PayloadAction<Conversation>) => {
            state.conversations = [{ action }, ...state.conversations]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getConversationsList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getConversationsList.fulfilled, (state, action: PayloadAction<Array<Conversation>>) => {
            state.loading = false;
            state.conversations = action.payload;
        });
        builder.addCase(getConversationsList.rejected, (state, action) => {
            state.loading = false;
            state.conversations = [];
            state.error = action.error.message;
        });
        builder.addCase(getConversationById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getConversationById.fulfilled, (state, action: PayloadAction<Conversation>) => {
            state.loading = false;
            state.conversation = action.payload;
        });
        builder.addCase(getConversationById.rejected, (state, action) => {
            state.loading = false;
            state.conversation = null;
            state.error = action.error.message;
        });
    },
})


export const conversationsSelector = (state: RootState) => state.conversationsState;
export const conversationSelector = (state: RootState) => state.conversationState;
export default conversation.reducer