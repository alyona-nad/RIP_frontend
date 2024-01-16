import { RootState } from "../store";

export const selectDyes = (state: RootState) => state.dye.data;
export const selectDyesStatus = (state: RootState) => state.dye.status;