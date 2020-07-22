import axios from "../../shared/config/axios";
import * as actionTypes from "../actionTypes";
import { error, success } from "../../hoc/withNotificationProvider";
import { updateObject, createSearchQuery } from "../../shared/utils/utility";
import browserHistory from "../../shared/config/history";

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

export const getStorageActionsList = (storageId, queryData) => {
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

export const actionRemoveStart = () => {
  return {
    type: actionTypes.ACTION_REMOVE_START,
  };
};

export const actionRemoveSuccess = () => {
  return {
    type: actionTypes.ACTION_REMOVE_SUCCESS,
  };
};

export const actionRemoveFail = () => {
  return {
    type: actionTypes.ACTION_REMOVE_FAIL,
  };
};

export const removeAction = (removedItems) => {
  return (dispatch) => {
    dispatch(actionRemoveStart());

    axios
      .post(`actions/remove`, removedItems)
      .then((res) => {
        dispatch(actionRemoveSuccess());
        success("REMOVE action success");
        // TODO change logic
        browserHistory.push("/xxx");
        browserHistory.push("/");
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(actionRemoveFail());
      });
  };
};

export const actionStoreStart = () => {
  return {
    type: actionTypes.ACTION_STORE_START,
  };
};

export const actionStoreSuccess = () => {
  return {
    type: actionTypes.ACTION_STORE_SUCCESS,
  };
};

export const actionStoreFail = () => {
  return {
    type: actionTypes.ACTION_STORE_FAIL,
  };
};

export const storeAction = (storedItems) => {
  return (dispatch) => {
    dispatch(actionStoreStart());

    axios
      .post(`actions/store`, storedItems)
      .then((res) => {
        dispatch(actionStoreSuccess());
        success("STORE action success");
        // TODO change logic
        browserHistory.push("/xxx");
        browserHistory.push("/");
      })
      .catch((err) => {
        error(err.response ? err.response.data.message : "Server error");
        dispatch(actionStoreFail());
      });
  };
};
