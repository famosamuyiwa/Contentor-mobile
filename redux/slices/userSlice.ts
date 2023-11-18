import { createSlice } from "@reduxjs/toolkit"

export type User = {
    username: string,
    displayPicture: string,
    headerPicture: string,
    name: string,
    bio?: string,
    link?: string,
    profession?: string
}

export type UserState = {
    user: User,
    loading: boolean,
    error: boolean
}

const initialState = {
    user: [],
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserDetailsStart: (state) => {
          state.loading = true;
          state.error = false;
        },
        getUserDetailsSuccess: (state, action) => {
          state.loading = false;
          state.user = action.payload;
        },
        getUserDetailsFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      }}) 


export const { getUserDetailsStart, getUserDetailsSuccess, getUserDetailsFailure } = userSlice.actions;

export default userSlice.reducer