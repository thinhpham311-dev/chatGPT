import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'layout',
    initialState: {
        isShow: false,
        input: ""
    },
    reducers: {
        toggleLayout: (state) => {
            state.isShow = !state.isShow
        },
        handleEnterInput: (state, action) => {
            state.input = action.payload
        }
    },
})

export const {
    toggleLayout,
    handleEnterInput
} = stateSlice.actions

export default stateSlice.reducer