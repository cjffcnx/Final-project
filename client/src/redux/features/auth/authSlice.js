import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    loading: false,
    user: null,
    token: null,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add extra reducers here using builder callback notation
        // Example:
        // builder.addCase(someAsyncThunk.pending, (state) => {
        //     state.loading = true;
        // })
    }
})

export default authSlice;