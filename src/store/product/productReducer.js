import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";

const initialState = {
  productsList: [],
  productsListLoading: true,
};

const productsListLoadStart = (state, action) => {
  return updateObject(state, {
    productsList: [],
    productsListLoading: true,
  });
};

const productsListLoadSuccess = (state, action) => {
  return updateObject(state, {
    productsList: action.products,
    productsListLoading: false,
  });
};

const productsListLoadFail = (state, action) => {
  return updateObject(state, {
    productsListLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_LIST_LOAD_START:
      return productsListLoadStart(state, action);
    case actionTypes.PRODUCT_LIST_LOAD_SUCCESS:
      return productsListLoadSuccess(state, action);
    case actionTypes.PRODUCT_LIST_LOAD_FAIL:
      return productsListLoadFail(state, action);
    default:
      return state;
  }
};

export default reducer;
