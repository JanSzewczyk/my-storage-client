import axios from "../../shared/config/axios";
import * as actionTypes from "../actionTypes";
import {
  mapStorageDtoToStorage,
  mapStorageViewDtoToStorageView,
} from "../../shared/data-utils/storageUtils";
import {
  ClearStorageStoreAction,
  SetStorageAction,
  StorageLoadFailureAction,
  StorageLoadStartAction,
  StorageLoadSuccessAction,
  StorageViewListLoadFailureAction,
  StorageViewListLoadStartAction,
  StorageViewListLoadSuccessAction,
} from "./types";
import StoreDispatch from "../../shared/types/store/StoreDispatch";
import { AxiosResponse } from "axios";
import Storage from "../../shared/types/storage/Storage";
import StorageDto from "../../shared/types/storage/StorageDto";
import StorageViewDto from "../../shared/types/storage/StorageViewDto";
import { SearchQuery } from "../../hooks/useQuery";
import { createSearchQuery } from "../../shared/utils/utility";
import PagedModel from "../../shared/types/apiResponse/PagedModel";
import PageInfo from "../../shared/types/common/PageInfo";

export const clearStorageStore = (): ClearStorageStoreAction => {
  return {
    type: actionTypes.STORAGE_STORE_CLEAR,
  };
};

export const storageViewListLoadStart = (): StorageViewListLoadStartAction => {
  return {
    type: actionTypes.STORAGE_VIEW_LIST_LOAD_START,
  };
};

export const storageViewListLoadSuccess = (
  storageViewDtoList: StorageViewDto[],
  pageInfo: PageInfo
): StorageViewListLoadSuccessAction => {
  return {
    type: actionTypes.STORAGE_VIEW_LIST_LOAD_SUCCESS,
    storages: storageViewDtoList.map(mapStorageViewDtoToStorageView),
    pageInfo: pageInfo,
  };
};

export const storageViewListLoadFailure = (): StorageViewListLoadFailureAction => {
  return {
    type: actionTypes.STORAGE_VIEW_LIST_LOAD_FAILURE,
  };
};

export const getStorageList = (queryData: SearchQuery): any => (
  dispatch: StoreDispatch
): any => {
  dispatch(storageViewListLoadStart());

  const query: string = createSearchQuery(queryData);

  return axios
    .get(`storages${query}`)
    .then((res: AxiosResponse<PagedModel<StorageViewDto[]>>) => {
      dispatch(storageViewListLoadSuccess(res.data.content, res.data.page));
    })
    .catch((err) => {
      dispatch(storageViewListLoadFailure());
    });
};

export const setStorage = (storage: Storage): SetStorageAction => {
  return {
    type: actionTypes.STORAGE_SET_STORAGE,
    storage: storage,
  };
};

export const storageLoadStart = (): StorageLoadStartAction => {
  return {
    type: actionTypes.STORAGE_LOAD_START,
  };
};

export const storageLoadSuccess = (
  storageDto: StorageDto
): StorageLoadSuccessAction => {
  return {
    type: actionTypes.STORAGE_LOAD_SUCCESS,
    storage: mapStorageDtoToStorage(storageDto),
  };
};

export const storageLoadFail = (): StorageLoadFailureAction => {
  return {
    type: actionTypes.STORAGE_LOAD_FAILURE,
  };
};

export const getStorage = (storageId: string): any => (
  dispatch: StoreDispatch
): any => {
  dispatch(storageLoadStart());

  return axios
    .get(`storages/${storageId}`)
    .then((res: AxiosResponse<StorageDto>) => {
      dispatch(storageLoadSuccess(res.data));
    })
    .catch((err) => {
      dispatch(storageLoadFail());
    });
};
