export const SET_ACTIVE_DYE_ID = 'SET_ACTIVE_DYE_ID';
export const SET_FILTER = 'SET_FILTER';
export const SET_NUM_OF_col_IN_Dye = 'SET_Num_OF_Col_IN_Dye';

export const setActiveDyeID = (activeDyeID: number) => ({
  type: SET_ACTIVE_DYE_ID,
  payload: activeDyeID,
});

export const SetFilter = (filter: string | '') => ({
  type: SET_FILTER,
  payload: filter,
});

export const setNumOfColInDye = (numOfColInDye: number | 0) => ({
  type: SET_NUM_OF_col_IN_Dye,
  payload: numOfColInDye,
});