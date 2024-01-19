import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'layout',
    initialState: {
        isShow: false,
        isShowInput: false,
        inputSend: "",
        inputEdit: "",
    },
    reducers: {
        toggleLayout: (state) => {
            state.isShow = !state.isShow
        },
        toggleInput: (state) => {
            state.isShowInput = !state.isShowInput
        },
        handleEnterSend: (state, action) => {
            state.inputSend = action.payload
        },
        handleEnterEdit: (state, action) => {
            state.inputEdit = action.payload
        }
    },
})

export const {
    toggleLayout,
    toggleInput,
    handleEnterSend,
    handleEnterEdit
} = stateSlice.actions

export default stateSlice.reducer