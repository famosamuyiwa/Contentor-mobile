import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    data: {}
}

const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
      saveUploadData(state, action) {
        state.data = action.payload
      },
      clearUploadData(state) {
        state.data = initialState.data
      },
      }}) 


export const { saveUploadData, clearUploadData } = uploadSlice.actions;

export default uploadSlice.reducer