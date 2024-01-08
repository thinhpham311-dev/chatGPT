import { configureStore } from '@reduxjs/toolkit';
import conversationState from './features/conversationSlice'
import stateSlice from './features/stateSlice';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        conversationState,
        stateSlice
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector