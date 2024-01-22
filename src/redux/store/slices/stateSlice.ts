import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'layout',
    initialState: {
        isShow: false,
        inputSend: "",
        id: NaN
    },
    reducers: {
        toggleLayout: (state) => {
            state.isShow = !state.isShow
        },

        handleEnterSend: (state, action) => {
            state.inputSend = action.payload
        },

    },
})

export const {
    toggleLayout,
    handleEnterSend,
} = stateSlice.actions

export default stateSlice.reducer