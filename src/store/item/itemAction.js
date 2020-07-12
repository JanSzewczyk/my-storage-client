import axios from "@config/axios";
import * as actionTypes from "../actionTypes";
import { error } from "@hoc/withNotificationProvider";
import { createSearchQuery } from "@utils/utility";

export const itemStorageListLoadStart = () => {
  return {
    type: actionTypes.ITEM_STORAGE_LIST_LOAD_START,
  };
};

export const itemStorageListLoadSuccess = (itemData) => {
  return {
    type: actionTypes.ITEM_STORAGE_LIST_LOAD_SUCCESS,
    items: itemData.content,
    pageInfo: itemData.page,
  };
};

export const itemStorageListLoadFail = () => {
  return {
    type: actionTypes.ITEM_STORAGE_LIST_LOAD_FAIL,
  };
};

export const getStorageItemsList = (storageId, queryData) => {
  return (dispatch) => {
    dispatch(itemStorageListLoadStart());

    const query = createSearchQuery(queryData);

    axios
      .get(`items/storage/${storageId}${query}`)
      .then((res) => {
        dispatch(itemStorageListLoadSuccess(res.data));
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(itemStorageListLoadFail());
      });
  };
};

export const itemStorageListEmployeeLoadStart = () => {
  return {
    type: actionTypes.ITEM_STORAGE_EMPLOYEE_LIST_LOAD_START,
  };
};

export const itemStorageListEmployeeLoadSuccess = (items) => {
  return {
    type: actionTypes.ITEM_STORAGE_EMPLOYEE_LIST_LOAD_SUCCESS,
    items: items,
  };
};

export const itemStorageListEmployeeLoadFail = () => {
  return {
    type: actionTypes.ITEM_STORAGE_EMPLOYEE_LIST_LOAD_FAIL,
  };
};

export const getStorageItemsEmployee = (storageId) => {
  return (dispatch) => {
    dispatch(itemStorageListEmployeeLoadStart());

    axios
      .get(`items/list/${storageId}`)
      .then((res) => {
        dispatch(itemStorageListEmployeeLoadSuccess(res.data));
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(itemStorageListEmployeeLoadFail());
      });
  };
};
