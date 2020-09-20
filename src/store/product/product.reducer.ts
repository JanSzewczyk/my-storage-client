import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  ProductActionTypes,
  ProductListLoadFailureAction,
  ProductListLoadStartAction,
  ProductListLoadSuccessAction,
  ProductState,
} from "./types";

const initialState: ProductState = {
  productList: [],
  productListLoading: true,
};

const productListLoadStart = (
  state: ProductState,
  action: ProductListLoadStartAction
): ProductState => {
  return updateObject(state, {
    productList: [],
    productListLoading: true,
  });
};

const productListLoadSuccess = (
  state: ProductState,
  action: ProductListLoadSuccessAction
): ProductState => {
  return updateObject(state, {
    productList: action.productList,
    productListLoading: false,
  });
};

const productListLoadFailure = (
  state: ProductState,
  action: ProductListLoadFailureAction
): ProductState => {
  return updateObject(state, {
    productListLoading: false,
  });
};

const reducer = (
  state = initialState,
  action: ProductActionTypes
): ProductState => {
  switch (action.type) {
    case actionTypes.PRODUCT_LIST_LOAD_START:
      return productListLoadStart(state, action);
    case actionTypes.PRODUCT_LIST_LOAD_SUCCESS:
      return productListLoadSuccess(state, action);
    case actionTypes.PRODUCT_LIST_LOAD_FAILURE:
      return productListLoadFailure(state, action);
    default:
      return state;
  }
};

export default reducer;
