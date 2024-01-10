import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { apiGetConversations, apiCreateConversation, apiDeleteConversation } from '@/services/ConversationService'
import { RootState } from "@/redux/store";
import { Conversation } from "@prisma/client";

export interface conversationState {
    loading: boolean;
    actionLoading: boolean;
    conversations: Conversation[] | undefined;
    conversationId: number | null;
    error: string | undefined;
}

const initialState: conversationState = {
    loading: false,
    actionLoading: false,
    conversations: [],
    conversationId: null,
    error: undefined,
}

export const getConversationsList = createAsyncThunk(
    "conversation/listConversations",
    async () => {
        const response: any = await apiGetConversations()
        return response.data
    }
)

export const postAddConversation = createAsyncThunk(
    "conversation/addConversation",
    async (data: Conversation) => {
        const response: any = await apiCreateConversation(data)
        return response.data
    }
)

export const postDeleteConversation = createAsyncThunk(
    "conversation/deleteConversation",
    async (data: Conversation) => {
        const response: any = await apiDeleteConversation(data)
    }
)


export const conversation = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        getConversationIdByCode: (state: any, action: PayloadAction<{ id: number }>) => {
            state.conversationId = action.payload.id
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
        builder.addCase(postAddConversation.pending, (state) => {
            state.actionLoading = true;
        });
        builder.addCase(postAddConversation.fulfilled, (state, action: PayloadAction<Conversation>) => {
            state.actionLoading = false;
            state.conversations?.unshift(action.payload);
        });
        builder.addCase(postAddConversation.rejected, (state, action) => {
            state.actionLoading = false;
            state.conversations = [];
            state.error = action.error.message;
        });
    },
})

// To able to use reducers we need to export them.
export const { getConversationIdByCode } = conversation.actions;

export const conversationsSelector = (state: RootState) => state.conversationsState;
export default conversation.reducer