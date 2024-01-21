import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'layout',
    initialState: {
        isShow: false,
        isShowInput: false,
        inputSend: "",
        inputEdit: "",
        id: NaN
    },
    reducers: {
        toggleLayout: (state) => {
            state.isShow = !state.isShow
        },
        openInput: (state, action) => {
            state.isShowInput = true
            state.id = action.payload
        },
        closeInput: (state, action) => {
            state.isShowInput = false
            state.id = action.payload
        },
        handleEnterSend: (state, action) => {
            state.inputSend = action.payload
        },
        handleEnterEdit: (state, action) => {
            state.inputEdit = action.payload

        },
    },
})

export const {
    toggleLayout,
    openInput,
    closeInput,
    handleEnterSend,
    handleEnterEdit,
} = stateSlice.actions

export default stateSlice.reducer