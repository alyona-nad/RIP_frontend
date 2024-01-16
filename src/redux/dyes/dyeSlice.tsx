import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DyeState {
  data: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: DyeState = {
  data: [],
  status: "idle",
};

const dyeSlice = createSlice({
  name: "dye",
  initialState,
  reducers: {
    getAllDyesStart: (state) => {
      state.status = "loading";
    },
    getAllDyesSuccess: (state, action: PayloadAction<any[]>) => {
      state.status = "succeeded";
      state.data = action.payload;
    },
    getAllDyesFailure: (state) => {
      state.status = "failed";
    },
  },
});

export const { getAllDyesStart, getAllDyesSuccess, getAllDyesFailure } = dyeSlice.actions;
export default dyeSlice.reducer;