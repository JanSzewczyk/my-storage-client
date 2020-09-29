import * as actionTypes from "../actionTypes";
import Storage from "../../shared/types/storage/Storage";
import StorageView from "../../shared/types/storage/StorageView";

export interface StorageState {
  storageViewList: StorageView[];
  storageViewListLoading: boolean;
  storage: Storage | null;
  storageLoading: boolean;
}

export interface ClearStorageStoreAction {
  type: typeof actionTypes.STORAGE_STORE_CLEAR;
}

export interface StorageViewListLoadStartAction {
  type: typeof actionTypes.STORAGE_VIEW_LIST_LOAD_START;
}

export interface StorageViewListLoadSuccessAction {
  type: typeof actionTypes.STORAGE_VIEW_LIST_LOAD_SUCCESS;
  storages: StorageView[];
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
  | ClearStorageStoreAction
  | StorageViewListLoadStartAction
  | StorageViewListLoadSuccessAction
  | StorageViewListLoadFailureAction
  | SetStorageAction
  | StorageLoadStartAction
  | StorageLoadSuccessAction
  | StorageLoadFailureAction;
