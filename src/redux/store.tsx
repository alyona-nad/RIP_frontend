import { configureStore } from "@reduxjs/toolkit";
import authMiddleware from "./auth/authMiddleware";
import dyesMiddleware from "./dyes/dyesMiddleware";
import authReducer from "./auth/authSlice";
import dyeReducer from "./dyes/dyeSlice"; // Добавили этот импорт
import {filterAndActiveIdReducer} from "./filterAndActiveDyeID/reducers"


const store = configureStore({
  reducer: {
    auth: authReducer,
   dye: dyeReducer,
    filterAndActiveId: filterAndActiveIdReducer,
    // Добавьте другие редюсеры, если необходимо
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(authMiddleware, dyesMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;