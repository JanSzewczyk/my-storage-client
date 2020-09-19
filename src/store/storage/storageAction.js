import axios from "../../shared/config/axios";
import * as actionTypes from "../actionTypes";
import {
  mapStorageDtoToStorage,
  mapStorageViewDtoToStorageView,
} from "../../shared/dataUtils/storageUtils";

export const clearStorageStore = () => {
  return {
    type: actionTypes.STORAGE_STORE_CLEAR,
  };
};

export const setStorage = (storage) => {
  return {
    type: actionTypes.STORAGE_SET_STORAGE,
    storage: storage,
  };
};

export const storageListLoadStart = () => {
  return {
    type: actionTypes.STORAGE_LIST_LOAD_START,
  };
};

export const storageListLoadSuccess = (storages) => {
  return {
    type: actionTypes.STORAGE_LIST_LOAD_SUCCESS,
    storages: storages.map(mapStorageViewDtoToStorageView),
  };
};

export const storageListLoadFail = () => {
  return {
    type: actionTypes.STORAGE_LIST_LOAD_FAIL,
  };
};

export const getStorageList = () => {
  return (dispatch) => {
    dispatch(storageListLoadStart());
    axios
      .get("storages")
      .then((res) => {
        dispatch(storageListLoadSuccess(res.data));
      })
      .catch((err) => {
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
  return {
    type: actionTypes.STORAGE_LOAD_SUCCESS,
    storage: mapStorageDtoToStorage(storage),
  };
};

export const storageLoadFail = () => {
  return {
    type: actionTypes.STORAGE_LOAD_FAIL,
  };
};

export const getStorage = (storageId) => {
  return (dispatch) => {
    dispatch(storageLoadStart());
    axios
      .get(`storages/${storageId}`)
      .then((res) => {
        dispatch(storageLoadSuccess(res.data));
      })
      .catch((err) => {
        dispatch(storageLoadFail());
      });
  };
};
