import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'layout',
    initialState: {
        isShow: false
    },
    reducers: {
        toggleLayout: (state) => {
            state.isShow = !state.isShow
        }
    },
})

export const {
    toggleLayout,
} = stateSlice.actions

export default stateSlice.reducer