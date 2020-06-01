import axios from "../../shared/axios";
import * as actionTypes from "../actionTypes";
import { error } from "../../components/UI/Notification";
import { updateObject, createSearchQuery } from "../../shared/utils/utility";

export const actionStorageListLoadStart = () => {
  return {
    type: actionTypes.ACTION_STORAGE_LIST_LOAD_START,
  };
};

export const actionStorageListLoadSuccess = (actionsData) => {
  const actions = actionsData.content.map((ac) =>
    updateObject(ac, {
      createdAt: new Date(ac.createdAt),
    })
  );

  return {
    type: actionTypes.ACTION_STORAGE_LIST_LOAD_SUCCESS,
    actions: actions,
    pageInfo: actionsData.page,
  };
};

export const actionStorageListLoadFail = () => {
  return {
    type: actionTypes.ACTION_STORAGE_LIST_LOAD_FAIL,
  };
};

export const getStoregeActionsList = (storageId, queryData) => {
  return (dispatch) => {
    dispatch(actionStorageListLoadStart());

    const query = createSearchQuery(queryData);

    axios
      .get(`actions/storage/${storageId}${query}`)
      .then((res) => {
        dispatch(actionStorageListLoadSuccess(res.data));
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(actionStorageListLoadFail());
      });
  };
};
