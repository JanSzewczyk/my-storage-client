import axios from "../../shared/axios";
import * as actionTypes from "../actionTypes";
import { error } from "../../components/UI/Notification";

export const storageListStart = () => {
  return {
    type: actionTypes.STORAGE_LIST_START,
  };
};

export const storageListSuccess = (storages) => {
  return {
    type: actionTypes.STORAGE_LIST_SUCCESS,
    storages: storages,
  };
};

export const storageListFail = () => {
  return {
    type: actionTypes.STORAGE_LIST_SUCCESS,
  };
};

export const getStoregeList = () => {
  return (dispatch) => {
    dispatch(storageListStart());
    axios
      .get("storages")
      .then((res) => {
        dispatch(storageListSuccess(res.data));
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(storageListFail());
      });
  };
};
