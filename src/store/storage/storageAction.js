import axios from "../../shared/axios";
import * as actionTypes from "../actionTypes";
import { error } from "../../components/UI/Notification";
import { updateObject } from "../../shared/utility";

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

export const storageLoadStart = () => {
  return {
    type: actionTypes.STORAGE_LOAD_START,
  };
};

export const storageLoadSuccess = (storage) => {
  const data = updateObject(storage, {
    createdAt: new Date(storage.createdAt),
    updatedAt: new Date(storage.updatedAt),
  });
  return {
    type: actionTypes.STORAGE_LOAD_SUCCESS,
    storage: data,
  };
};

export const storageLoadFail = () => {
  return {
    type: actionTypes.STORAGE_LOAD_FAIL,
  };
};

export const getStorege = (storageId) => {
  return (dispatch) => {
    dispatch(storageLoadStart());
    axios
      .get(`storages/${storageId}`)
      .then((res) => {
        dispatch(storageLoadSuccess(res.data));
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(storageLoadFail());
      });
  };
};
