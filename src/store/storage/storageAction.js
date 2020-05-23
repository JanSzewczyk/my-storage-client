import axios from "../../shared/axios";
import * as actionTypes from "../actionTypes";
import { error } from "../../components/UI/Notification";

export const storageListLoadStart = () => {
  return {
    type: actionTypes.STORAGE_LIST_LOAD_START,
  };
};

export const storageListLoadSuccess = (storages) => {
  return {
    type: actionTypes.STORAGE_LIST_LOAD_SUCCESS,
    storages: storages,
  };
};

export const storageListLoadFail = () => {
  return {
    type: actionTypes.STORAGE_LIST_LOAD_FAIL,
  };
};

export const getStoregeList = () => {
  return (dispatch) => {
    dispatch(storageListLoadStart());
    axios
      .get("storages")
      .then((res) => {
        dispatch(storageListLoadSuccess(res.data));
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(storageListLoadFail());
      });
  };
};
