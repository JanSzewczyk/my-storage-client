import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  ClearStorageStoreAction,
  SetStorageAction,
  StorageActionTypes,
  StorageLoadFailureAction,
  StorageLoadStartAction,
  StorageLoadSuccessAction,
  StorageState,
  StorageViewListLoadFailureAction,
  StorageViewListLoadStartAction,
  StorageViewListLoadSuccessAction,
} from "./types";

const initialState: StorageState = {
  storageViewList: [],
  pageInfo: null,
  storageViewListLoading: true,
  storage: null,
  storageLoading: true,
};

const clearStorageStore = (
  state: StorageState,
  action: ClearStorageStoreAction
): StorageState => {
  return updateObject(state, initialState);
};

const storageViewListLoadStart = (
  state: StorageState,
  action: StorageViewListLoadStartAction
): StorageState => {
  return updateObject(state, {
    storageViewList: [],
    pageInfo: null,
    storageViewListLoading: true,
  });
};

const storageViewListLoadSuccess = (
  state: StorageState,
  action: StorageViewListLoadSuccessAction
): StorageState => {
  return updateObject(state, {
    storageViewList: action.storages,
    pageInfo: action.pageInfo,
    storageViewListLoading: false,
  });
};

const storageViewListLoadFailure = (
  state: StorageState,
  action: StorageViewListLoadFailureAction
): StorageState => {
  return updateObject(state, {
    storageViewListLoading: false,
  });
};

const setStorage = (
  state: StorageState,
  action: SetStorageAction
): StorageState => {
  return updateObject(state, {
    storage: action.storage,
  });
};

const storageLoadStart = (
  state: StorageState,
  action: StorageLoadStartAction
): StorageState => {
  return updateObject(state, { storage: null, storageLoading: true });
};

const storageLoadSuccess = (
  state: StorageState,
  action: StorageLoadSuccessAction
): StorageState => {
  return updateObject(state, {
    storage: action.storage,
    storageLoading: false,
  });
};

const storageLoadFailure = (
  state: StorageState,
  action: StorageLoadFailureAction
): StorageState => {
  return updateObject(state, {
    storageLoading: false,
  });
};

const reducer = (
  state = initialState,
  action: StorageActionTypes
): StorageState => {
  switch (action.type) {
    case actionTypes.STORAGE_STORE_CLEAR:
      return clearStorageStore(state, action);

    case actionTypes.STORAGE_VIEW_LIST_LOAD_START:
      return storageViewListLoadStart(state, action);
    case actionTypes.STORAGE_VIEW_LIST_LOAD_SUCCESS:
      return storageViewListLoadSuccess(state, action);
    case actionTypes.STORAGE_VIEW_LIST_LOAD_FAILURE:
      return storageViewListLoadFailure(state, action);

    case actionTypes.STORAGE_SET_STORAGE:
      return setStorage(state, action);
    case actionTypes.STORAGE_LOAD_START:
      return storageLoadStart(state, action);
    case actionTypes.STORAGE_LOAD_SUCCESS:
      return storageLoadSuccess(state, action);
    case actionTypes.STORAGE_LOAD_FAILURE:
      return storageLoadFailure(state, action);

    default:
      return state;
  }
};

export default reducer;
