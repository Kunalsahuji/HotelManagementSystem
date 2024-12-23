import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    properties: [],
    isPropertiesLoading: false,
    error: null,
}

const propertySlice = createSlice({
    name: 'property',
    initialState,
    reducers: {
        fetchPropertiesStart(state) {
            state.isPropertiesLoading = true
        },
        fetchPropertiesSuccess(state, action) {
            state.isPropertiesLoading = false;
            state.properties = action.payload
        },
        fetchPropertiesFailure(state, action) {
            state.isPropertiesLoading = false,
            state.error = action.payload
        }
    }
})

export const { fetchPropertiesStart, fetchPropertiesSuccess, fetchPropertiesFailure } = propertySlice.actions

export default propertySlice.reducer