import axios from "../../shared/axios";
import * as actionTypes from "../actionTypes";
import { error } from "../../components/UI/Notification";

export const productsListLoadStart = () => {
  return {
    type: actionTypes.PRODUCT_LIST_LOAD_START,
  };
};

export const productsListLoadSuccess = (products) => {
  return {
    type: actionTypes.PRODUCT_LIST_LOAD_SUCCESS,
    products: products,
  };
};

export const productsListLoadFail = () => {
  return {
    type: actionTypes.PRODUCT_LIST_LOAD_FAIL,
  };
};

export const getProductsList = (ownerId) => {
  return (dispatch) => {
    dispatch(productsListLoadStart());

    axios
      .get(`products/${ownerId}`)
      .then((res) => {
        dispatch(productsListLoadSuccess(res.data));
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(productsListLoadFail());
      });
  };
};
