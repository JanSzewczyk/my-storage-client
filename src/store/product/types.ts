import Product from "../../shared/types/product/Product";
import * as actionTypes from "../actionTypes";

export interface ProductState {
  productList: Product[];
  productListLoading: boolean;
}

export interface ProductListLoadStartAction {
  type: typeof actionTypes.PRODUCT_LIST_LOAD_START;
}

export interface ProductListLoadSuccessAction {
  type: typeof actionTypes.PRODUCT_LIST_LOAD_SUCCESS;
  productList: Product[];
}

export interface ProductListLoadFailureAction {
  type: typeof actionTypes.PRODUCT_LIST_LOAD_FAILURE;
}

export type ProductActionTypes =
  | ProductListLoadStartAction
  | ProductListLoadSuccessAction
  | ProductListLoadFailureAction;
