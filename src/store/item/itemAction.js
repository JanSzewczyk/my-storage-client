import axios from "../../shared/axios";
import * as actionTypes from "../actionTypes";
import { error } from "../../components/UI/Notification";
import { createSearchQuery } from "../../shared/utils/utility";

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

export const getStoregeItemsList = (storageId, queryData) => {
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
