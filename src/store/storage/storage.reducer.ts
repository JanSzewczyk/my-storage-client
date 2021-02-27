import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  InitStorageStoreAction,
  SetStorageAction,
  StorageActionTypes,
  StorageLoadFailureAction,
  StorageLoadStartAction,
  StorageLoadSuccessAction,
  StorageStoreState,
  StorageViewListLoadFailureAction,
  StorageViewListLoadStartAction,
  StorageViewListLoadSuccessAction,
} from "./types";

export const initialState: StorageStoreState = {
  storageViewList: [],
  pageInfo: null,
  storageViewListLoading: true,
  storage: null,
  storageLoading: true,
};

const initStorageStore = (
  state: StorageStoreState,
  action: InitStorageStoreAction
): StorageStoreState => {
  return initialState;
};

const storageViewListLoadStart = (
  state: StorageStoreState,
  action: StorageViewListLoadStartAction
): StorageStoreState => {
  return updateObject(state, {
    storageViewList: [],
    pageInfo: null,
    storageViewListLoading: true,
  });
};

const storageViewListLoadSuccess = (
  state: StorageStoreState,
  action: StorageViewListLoadSuccessAction
): StorageStoreState => {
  return updateObject(state, {
    storageViewList: action.storages,
    pageInfo: action.pageInfo,
    storageViewListLoading: false,
  });
};

const storageViewListLoadFailure = (
  state: StorageStoreState,
  action: StorageViewListLoadFailureAction
): StorageStoreState => {
  return updateObject(state, {
    storageViewListLoading: false,
  });
};

const setStorage = (
  state: StorageStoreState,
  action: SetStorageAction
): StorageStoreState => {
  return updateObject(state, {
    storage: action.storage,
  });
};

const storageLoadStart = (
  state: StorageStoreState,
  action: StorageLoadStartAction
): StorageStoreState => {
  return updateObject(state, { storage: null, storageLoading: true });
};

const storageLoadSuccess = (
  state: StorageStoreState,
  action: StorageLoadSuccessAction
): StorageStoreState => {
  return updateObject(state, {
    storage: action.storage,
    storageLoading: false,
  });
};

const storageLoadFailure = (
  state: StorageStoreState,
  action: StorageLoadFailureAction
): StorageStoreState => {
  return updateObject(state, {
    storageLoading: false,
  });
};

const reducer = (
  state = initialState,
  action: StorageActionTypes
): StorageStoreState => {
  switch (action.type) {
    case actionTypes.INIT_STORAGE_STORE:
      return initStorageStore(state, action);

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
