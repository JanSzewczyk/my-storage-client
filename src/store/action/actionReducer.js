import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";

const initialState = {
  actionsList: [],
  pageInfo: null,
  actionsListLoading: true,
};

const actionStorageListLoadStart = (state, action) => {
  return updateObject(state, {
    actionsList: [],
    pageInfo: null,
    actionsListLoading: true,
  });
};

const actionStorageListLoadSuccess = (state, action) => {
  return updateObject(state, {
    actionsList: action.actions,
    pageInfo: action.pageInfo,
    actionsListLoading: false,
  });
};

const actionStorageListLoadFail = (state, action) => {
  return updateObject(state, {
    actionsListLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTION_STORAGE_LIST_LOAD_START:
      return actionStorageListLoadStart(state, action);
    case actionTypes.ACTION_STORAGE_LIST_LOAD_SUCCESS:
      return actionStorageListLoadSuccess(state, action);
    case actionTypes.ACTION_STORAGE_LIST_LOAD_FAIL:
      return actionStorageListLoadFail(state, action);
    default:
      return state;
  }
};

export default reducer;
