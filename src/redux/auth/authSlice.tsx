import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  role: number | -1;
  userInfo: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  role: -1,
  userInfo: ""
};

/*const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
      state.role = -1;
    },
    setRole: (state, action: PayloadAction<number | -1>) => {
      state.role = action.payload;
    },
  },
});*/
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
      state.role = -1;
      state.userInfo = ""; // Сброс информации о пользователе при неудачном входе
    },
    setRole: (state, action: PayloadAction<number | -1>) => {
      state.role = action.payload;
    },
    updateUserInfo: (state, action: PayloadAction<string>) => {
      state.userInfo = action.payload; // Обновление информации о пользователе
    },
  },
});

export const { loginSuccess, loginFailure, setRole, updateUserInfo   } = authSlice.actions;
export default authSlice.reducer;