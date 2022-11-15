import { configureStore } from '@reduxjs/toolkit'
import optionsSlice from './optionsSlice'
import testSlice from "./testSlice"

export const store = configureStore({
  reducer: {
      options: optionsSlice, 
      testQuestions: testSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch