import axios from "../../shared/config/axios";
import * as actionTypes from "../actionTypes";
import { error, success } from "../../components/UI/Notification";
import { updateObject } from "../../shared/utils/utility";
import browserHistory from "../../shared/config/history";

const processStorage = (storage) =>
  updateObject(storage, {
    createdAt: new Date(storage.createdAt),
    updatedAt: new Date(storage.updatedAt),
  });

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

export const getStorageList = () => {
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
  return {
    type: actionTypes.STORAGE_LOAD_SUCCESS,
    storage: processStorage(storage),
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
        error(err.response ? err.response.data.message : "Server error");
        dispatch(storageLoadFail());
      });
  };
};

export const storageEditStart = () => {
  return {
    type: actionTypes.STORAGE_EDIT_START,
  };
};

export const storageEditSuccess = (storage) => {
  return {
    type: actionTypes.STORAGE_EDIT_SUCCESS,
    storage: processStorage(storage),
  };
};

export const storageEditFail = () => {
  return {
    type: actionTypes.STORAGE_EDIT_FAIL,
  };
};

export const editStorage = (storageId, updatedStorage) => {
  return (dispatch) => {
    dispatch(storageEditStart());
    axios
      .put(`storages/${storageId}`, updatedStorage)
      .then((res) => {
        success(`The ${res.data.name} storage has been updated`);
        dispatch(storageEditSuccess(res.data));
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(storageEditFail());
      });
  };
};

export const storageCreateStart = () => {
  return {
    type: actionTypes.STORAGE_CREATE_START,
  };
};

export const storageCreateSuccess = (storage) => {
  return {
    type: actionTypes.STORAGE_CREATE_SUCCESS,
  };
};

export const storageCreateFail = () => {
  return {
    type: actionTypes.STORAGE_CREATE_FAIL,
  };
};

export const createStorage = (storage) => {
  return (dispatch) => {
    dispatch(storageCreateStart());
    axios
      .post(`storages`, storage)
      .then((res) => {
        const newStorage = res.data;
        success(`The ${newStorage.name} storage has been created`);
        dispatch(storageCreateSuccess());
        browserHistory.push(`/storages/${newStorage.storageId}`);
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(storageCreateFail());
      });
  };
};

export const storageRemoveStart = () => {
  return {
    type: actionTypes.STORAGE_REMOVE_START,
  };
};

export const storageRemoveSuccess = () => {
  return {
    type: actionTypes.STORAGE_REMOVE_SUCCESS,
  };
};

export const storageRemoveFail = () => {
  return {
    type: actionTypes.STORAGE_REMOVE_FAIL,
  };
};

export const removeStorage = (storageId) => {
  return (dispatch) => {
    dispatch(storageRemoveStart());
    axios
      .delete(`storages/${storageId}`)
      .then((res) => {
        success(`The ${res.data.name} storage has been removed`);
        dispatch(storageRemoveSuccess());
        browserHistory.push(`/storages`);
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(storageRemoveFail());
      });
  };
};
