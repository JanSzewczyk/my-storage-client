import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  storageList: [],
  storageListLoading: true,
};

const storageListLoadStart = (state, action) => {
  return updateObject(state, { storageList: [], storageListLoading: true });
};

const storageListLoadSuccess = (state, action) => {
  return updateObject(state, {
    storageList: action.storages,
    storageListLoading: false,
  });
};

const storageListLoadFail = (state, action) => {
  return updateObject(state, {
    storageListLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORAGE_LIST_LOAD_START:
      return storageListLoadStart(state, action);
    case actionTypes.STORAGE_LIST_LOAD_SUCCESS:
      return storageListLoadSuccess(state, action);
    case actionTypes.STORAGE_LIST_LOAD_FAIL:
      return storageListLoadFail(state, action);
    default:
      return state;
  }
};

export default reducer;
