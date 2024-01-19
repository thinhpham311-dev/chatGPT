import { configureStore } from '@reduxjs/toolkit';
import conversationsState from './slices/conversationSlice'
import messageChatsState from './slices/messageSlice';
import stateSlice from './slices/stateSlice';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        conversationsState,
        messageChatsState,
        stateSlice
    },
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector