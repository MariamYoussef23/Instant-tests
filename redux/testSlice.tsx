import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface OptionsState {
  value: [];
}

// Define the initial state using that type
const initialState: OptionsState = {
  value: [],
};

export const optionsSlice = createSlice({
  name: "testQuestions",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addQuestion: (state, action: PayloadAction<{id:any}>) => {
      const index = state.value.findIndex(
        (obj: any) => obj.id === action.payload.id
      );
      if (index === -1) {
        state.value.push(action.payload);
      }
    },
    removeQuestion: (state, action: PayloadAction<{}>) => {
      // state.value.push(action.payload);
    },
  },
});

export const { addQuestion, removeQuestion } = optionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const testQuestions = (state: RootState) => state.testQuestions.value;

export default optionsSlice.reducer;
