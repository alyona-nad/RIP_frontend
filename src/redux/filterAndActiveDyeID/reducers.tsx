import { combineReducers, AnyAction } from 'redux';
import {
  //SET_ACTIVE_DYE_ID,
  SET_SEARCH_FILTER,
  SET_NUM_OF_col_IN_Dye,
} from './actions';

/*const activeDyeIDReducer = (state: number | null = null, action: AnyAction) => {
  switch (action.type) {
    case SET_ACTIVE_DYE_ID:
      return action.payload;
    default:
      return state;
  }
};*/

const SearchFilterReducer = (state: string | '' = '', action: AnyAction) => {
  switch (action.type) {
    case SET_SEARCH_FILTER:
      return action.payload;
    default:
      return state;
  }
};

const numOfColReducer = (state: number | 0 = 0, action: AnyAction) => {
  switch (action.type) {
    case SET_NUM_OF_col_IN_Dye:
      return action.payload;
    default:
      return state;
  }
};

export const filterAndActiveIdReducer = combineReducers({
  //activeDyeID: activeDyeIDReducer,
  SearchFilter: SearchFilterReducer,
  numOfCol: numOfColReducer,
});