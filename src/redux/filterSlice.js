import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  selectors: {
    selectFilter: (state) => state.filter,
  },
  reducers: {
    changeFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { selectFilter } = filterSlice.selectors;
export const { changeFilter } = filterSlice.actions;
