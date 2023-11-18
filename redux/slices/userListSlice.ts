import { createSlice } from "@reduxjs/toolkit"

export type User = {
    username: string,
    displayPicture: string,
    headerPicture: string
    name: string,
    bio?: string,
    link?: string,
    profession?: string
}

export type UserListState = {
    users: User[],
    loading: boolean,
    error: boolean
}

const initialState = {
    users: [],
    loading: false,
    error: false
}

const usersListSlice = createSlice({
    name: "userList",
    initialState,
    reducers: {}
}) 

export default usersListSlice.reducer