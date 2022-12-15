import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPsbUserInfo } from "./actions"

export const getUserInfo = createAsyncThunk(
    "user/getUserInfo", 
    async () => getPsbUserInfo()
);

const initialState = {
    user: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
   
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserInfo.fulfilled, (state, action) => {
            state.user = action.payload
        })

    }
});

export default userSlice.reducer;