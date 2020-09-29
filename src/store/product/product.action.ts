import { AxiosResponse } from "axios";
import axios from "../../shared/config/axios";
import Product from "../../shared/types/product/Product";
import StoreDispatch from "../../shared/types/store/StoreDispatch";
import * as actionTypes from "../actionTypes";
import {
  ProductListLoadFailureAction,
  ProductListLoadStartAction,
  ProductListLoadSuccessAction,
} from "./types";

export const productListLoadStart = (): ProductListLoadStartAction => {
  return {
    type: actionTypes.PRODUCT_LIST_LOAD_START,
  };
};

export const productListLoadSuccess = (
  productDtoList: Product[]
): ProductListLoadSuccessAction => {
  return {
    type: actionTypes.PRODUCT_LIST_LOAD_SUCCESS,
    productList: productDtoList, 
  };
};

export const productListLoadFailure = (): ProductListLoadFailureAction => {
  return {
    type: actionTypes.PRODUCT_LIST_LOAD_FAILURE,
  };
};

export const getProductsList = (ownerId: string): any => (
  dispatch: StoreDispatch
): any => {
  dispatch(productListLoadStart());

  return axios
    .get(`products/${ownerId}`)
    .then((res: AxiosResponse<Product[]>) => {
      dispatch(productListLoadSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productListLoadFailure());
    });
};
