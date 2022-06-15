import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
};

export const logInSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.user = action.payload;
        },
        logOut: (state) => {
            state.user = null;
        }
    }
});

// Action creators are generated for each case reducer function
export const { logIn, logOut } = logInSlice.actions;

export default logInSlice.reducer;
