import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import userListSlice from './slices/userListSlice'
import uploadSlice from './slices/uploadSlice'

const rootReducer = combineReducers({
    user: userSlice,
    userList: userListSlice,
    upload: uploadSlice
})

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
    reducer: rootReducer,
})

export default store