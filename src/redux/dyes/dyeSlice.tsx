import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DyeState {
  data: any[];
  //status: "idle" | "loading" | "succeeded" | "failed";
  status: "" | "Cформирован" | "Завершён" | "Отклонено";
}
const initialState: DyeState = {
  data: [],
  status: "",
};

const dyeSlice = createSlice({
  name: "dye",
  initialState,
  reducers: {
    getAllDyesStart: (state) => {
      state.status = "Cформирован";
    },
    getAllDyesSuccess: (state, action: PayloadAction<any[]>) => {
      state.status = "Завершён";
      state.data = action.payload;
    },
    getAllDyesFailure: (state) => {
      state.status = "Отклонено";
    },
  },
})
/*
const initialState: DyeState = {
  data: [],
  status: "",
};

const dyeSlice = createSlice({
  name: "dye",
  initialState,
  reducers: {
    getAllDyesStart: (state) => {
      state.status = "Действует";
    },
    getAllDyesSuccess: (state, action: PayloadAction<any[]>) => {
      state.status = "Завершён";
      state.data = action.payload;
    },
    getAllDyesFailure: (state) => {
      state.status = "Отклонено";
    },
  },
});
/*
interface DyeState {
  data: any[];
  status: "" |"Сформирован" | "Завершён" | "Отклонено"  ;
}


const initialState: DyeState = {
  data: [],
  status: "",
};

const dyeSlice = createSlice({
  name: "dye",
  initialState,
  reducers: {
    getAllDyesStart: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    getAllDyesSuccess: (state, action: PayloadAction<any[]>) => {
      // В этом месте, если вы хотите установить статус в зависимости от данных,
      // то вам нужно как-то это определить. Допустим, у вас есть поле `status` в данных,
      // и вы хотите установить его в `state.status`.
      if (action.payload.length > 0 && action.payload[0].status) {
        state.status = action.payload[0].status;
      } else {
        state.status = "Сформирован"; // По умолчанию
      }
      state.data = action.payload;
    },
    getAllDyesFailure: (state) => {
      state.status = "Отклонено"; // Устанавливайте желаемый статус для ошибки
    },
  },
});*/



export const { getAllDyesStart, getAllDyesSuccess, getAllDyesFailure } = dyeSlice.actions;
export default dyeSlice.reducer;