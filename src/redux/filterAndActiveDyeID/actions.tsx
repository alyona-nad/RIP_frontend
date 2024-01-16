export const SET_ACTIVE_DYE_ID = 'SET_ACTIVE_DYE_ID';
//export const SET_MAX_PRICE_FILTER = 'SET_MAX_PRICE_FILTER';
//export const SET_NUM_OF_PROD_IN_REQ = 'SET_Num_OF_PROD_IN_REQ';

export const setActiveDyeID = (activeDyeID: number) => ({
  type: SET_ACTIVE_DYE_ID,
  payload: activeDyeID,
});

/*export const setMaxPriceFilter = (maxPrice: string | '') => ({
  type: SET_MAX_PRICE_FILTER,
  payload: maxPrice,
});

export const setNumOfProdInReq = (numOfProdInReq: number | 0) => ({
  type: SET_NUM_OF_PROD_IN_REQ,
  payload: numOfProdInReq,
});*/