import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { apiGetConversations, apiPostCreateConversation } from '@/services/ConversationService'
import { RootState } from "@/redux/store";
import { Conversation } from "@prisma/client";

export interface conversationState {
    loading: boolean;
    conversations: Array<Conversation>;
    idConversation: string;
    error: string | undefined;
}

const initialState: conversationState = {
    loading: false,
    idConversation: '',
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

export const postCreateConversation = async (data: Conversation) => {
    const response: any = await apiPostCreateConversation(data)
    return response.data
}

export const messages = createSlice({
    name: "conversation",
    initialState,
    reducers: {},
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
    },
})


export const messageSelector = (state: RootState) => state.conversationState;
export default messages.reducer