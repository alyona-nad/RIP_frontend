export const SET_ACTIVE_DYE_ID = 'SET_ACTIVE_DYE_ID';
export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER';
export const SET_NUM_OF_col_IN_Dye = 'SET_Num_OF_Col_IN_Dye';

/*export const setActiveDyeID = (activeDyeID: number) => ({
  type: SET_ACTIVE_DYE_ID,
  payload: activeDyeID,
});*/

export const SetSearchFilter = (Searchfilter: string | '') => ({
  type: SET_SEARCH_FILTER,
  payload: Searchfilter,
});

export const setNumOfColInDye = (numOfColInDye: number | 0) => ({
  type: SET_NUM_OF_col_IN_Dye,
  payload: numOfColInDye,
});