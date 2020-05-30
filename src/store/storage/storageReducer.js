import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";

const initialState = {
  storageList: [],
  storageListLoading: true,
  storage: null,
  storageLoading: true,
  storageActionLoading: false,
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

const storageLoadStart = (state, action) => {
  return updateObject(state, { storage: null, storageLoading: true });
};

const storageLoadSuccess = (state, action) => {
  return updateObject(state, {
    storage: action.storage,
    storageLoading: false,
  });
};

const storageLoadFail = (state, action) => {
  return updateObject(state, {
    storageLoading: false,
  });
};

const storageEditStart = (state, action) => {
  return updateObject(state, { storageActionLoading: true });
};

const storageEditSuccess = (state, action) => {
  return updateObject(state, {
    storage: action.storage,
    storageActionLoading: false,
  });
};

const storageEditFail = (state, action) => {
  return updateObject(state, {
    storageActionLoading: false,
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

    case actionTypes.STORAGE_LOAD_START:
      return storageLoadStart(state, action);
    case actionTypes.STORAGE_LOAD_SUCCESS:
      return storageLoadSuccess(state, action);
    case actionTypes.STORAGE_LOAD_FAIL:
      return storageLoadFail(state, action);

    case actionTypes.STORAGE_EDIT_START:
      return storageEditStart(state, action);
    case actionTypes.STORAGE_EDIT_SUCCESS:
      return storageEditSuccess(state, action);
    case actionTypes.STORAGE_EDIT_FAIL:
      return storageEditFail(state, action);
    default:
      return state;
  }
};

export default reducer;
