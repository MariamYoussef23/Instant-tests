import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { stat } from "fs/promises";

// Define a type for the slice state
interface OptionsState {
  value: any;
}

// Define the initial state using that type
const initialState: OptionsState = {
  value: [],
};

export const optionsSlice = createSlice({
  name: "testQuestions",
  initialState,
  reducers: {
    //add question to test if it's' not on test and add question number to it
    addQuestion: (state, action: PayloadAction<{ id: any }>) => {
      const index = state.value.findIndex(
        (obj: any) => obj.id === action.payload.id
      );
      if (index === -1) {
        state.value.push({
          ...action.payload,
          questionNo: state.value.length + 1,
        });
      }
    },
    removeQuestion: (state, action: PayloadAction<{ id: any }>) => {
      state.value.splice(
        state.value.findIndex((a: any) => a.id === action.payload.id),
        1
      );
      state.value.map((x: any, indx: any) => {
        x.questionNo = indx + 1;
      });
    },
    //function to change the question number to the new number in redux
    //rearrange the questions according to the question number then change the question number
    editQuestionNo: (
      state,
      action: PayloadAction<{ number: string; id: any }>
    ) => {
      if (action.payload.number !== "") {
        let index = state.value.findIndex(
          (obj: any) => obj.id === action.payload.id
        );
        if (index != -1) {
          state.value[index]!.questionNo = action.payload.number;
        }
        const toIndex = +action.payload.number - 1;
        const element = state.value.splice(index, 1)[0];
        state.value.splice(toIndex, 0, element);
        state.value.map((x: any, indx: any) => {
          x.questionNo = indx + 1;
        });
      }
    },
    clearTest: (state) => {
      state.value = [];
    },
    //function to add test for editing
    addOptions: (state, action: PayloadAction<[]>) => {
      state.value = [...state.value, ...action.payload];
    },
    editTestInitial: (state, action: PayloadAction<[]>) => {
      state.value = [...state.value, ...action.payload];
    },
  },
});

export const { addQuestion, removeQuestion, editQuestionNo, clearTest, editTestInitial } =
  optionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const testQuestions = (state: RootState) => state.reducer.testQuestions.value;

export default optionsSlice.reducer;
