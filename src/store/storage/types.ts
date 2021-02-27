import * as actionTypes from "../actionTypes";
import Storage from "../../shared/types/storage/Storage";
import StorageView from "../../shared/types/storage/StorageView";
import PageInfo from "../../shared/types/common/PageInfo";

export interface StorageStoreState {
  storageViewList: StorageView[];
  pageInfo: PageInfo | null;
  storageViewListLoading: boolean;
  storage: Storage | null;
  storageLoading: boolean;
}

export interface InitStorageStoreAction {
  type: typeof actionTypes.INIT_STORAGE_STORE;
}

export interface StorageViewListLoadStartAction {
  type: typeof actionTypes.STORAGE_VIEW_LIST_LOAD_START;
}

export interface StorageViewListLoadSuccessAction {
  type: typeof actionTypes.STORAGE_VIEW_LIST_LOAD_SUCCESS;
  storages: StorageView[];
  pageInfo: PageInfo;
}

export interface StorageViewListLoadFailureAction {
  type: typeof actionTypes.STORAGE_VIEW_LIST_LOAD_FAILURE;
}

export interface SetStorageAction {
  type: typeof actionTypes.STORAGE_SET_STORAGE;
  storage: Storage;
}

export interface StorageLoadStartAction {
  type: typeof actionTypes.STORAGE_LOAD_START;
}

export interface StorageLoadSuccessAction {
  type: typeof actionTypes.STORAGE_LOAD_SUCCESS;
  storage: Storage;
}

export interface StorageLoadFailureAction {
  type: typeof actionTypes.STORAGE_LOAD_FAILURE;
}

export type StorageActionTypes =
  | InitStorageStoreAction
  | StorageViewListLoadStartAction
  | StorageViewListLoadSuccessAction
  | StorageViewListLoadFailureAction
  | SetStorageAction
  | StorageLoadStartAction
  | StorageLoadSuccessAction
  | StorageLoadFailureAction;
