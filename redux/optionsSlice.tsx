import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface OptionsState {
  value: [
    {
      hidden?: boolean;
    }?
  ];
}

// Define the initial state using that type
const initialState: OptionsState = {
  value: [],
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addOptions: (state, action: PayloadAction<[]>) => {
      state.value = [...state.value, ...action.payload];
    },
    // set hidden to true
    handleHidden: (state, action: PayloadAction<{ id: any }>) => {
      let index = state.value.findIndex(
        (obj: any) => obj.id === action.payload.id
      );
      if (index != -1) {
        state.value[index]!.hidden = !state.value[index]!.hidden;
      }
    },
  },
});

export const { addOptions, handleHidden } = optionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const options = (state: RootState) => state.options.value;

export default optionsSlice.reducer;
