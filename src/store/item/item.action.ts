import axios from "../../shared/config/axios";
import * as actionTypes from "../actionTypes";
import { createSearchQuery } from "../../shared/utils/utility";
import {
  InitItemStoreAction,
  ItemListLoadFailureAction,
  ItemListLoadStartAction,
  ItemListLoadSuccessAction,
  ItemViewListLoadFailureAction,
  ItemViewListLoadStartAction,
  ItemViewListLoadSuccessAction,
} from "./types";
import PageInfo from "../../shared/types/common/PageInfo";
import { AxiosResponse } from "axios";
import PagedModel from "../../shared/types/apiResponse/PagedModel";
import StoreDispatch from "../../shared/types/store/StoreDispatch";
import Item from "../../shared/types/item/Item";
import ItemView from "../../shared/types/item/ItemView";
import { Query } from "../../hooks/useQuery";

export const initItemStore = (): InitItemStoreAction => {
  return {
    type: actionTypes.ITEM_INIT,
  };
};

export const itemViewListLoadStart = (): ItemViewListLoadStartAction => {
  return {
    type: actionTypes.ITEM_VIEW_LIST_LOAD_START,
  };
};

export const itemViewListLoadSuccess = (
  itemViewList: ItemView[],
  pageInfo: PageInfo
): ItemViewListLoadSuccessAction => {
  return {
    type: actionTypes.ITEM_VIEW_LIST_LOAD_SUCCESS,
    itemViewList: itemViewList,
    pageInfo: pageInfo,
  };
};

export const itemViewListLoadFailure = (): ItemViewListLoadFailureAction => {
  return {
    type: actionTypes.ITEM_VIEW_LIST_LOAD_FAILURE,
  };
};

export const getStorageItemViewList = (
  storageId: string,
  queryData: Query
): any => (dispatch: StoreDispatch): any => {
  dispatch(itemViewListLoadStart());

  const query: string = createSearchQuery(queryData);

  return axios
    .get(`items/storage/${storageId}${query}`)
    .then((res: AxiosResponse<PagedModel<ItemView[]>>) => {
      dispatch(itemViewListLoadSuccess(res.data.content, res.data.page));
    })
    .catch((err) => {
      dispatch(itemViewListLoadFailure());
    });
};

export const itemListLoadStart = (): ItemListLoadStartAction => {
  return {
    type: actionTypes.ITEM_LIST_LOAD_START,
  };
};

export const itemListLoadSuccess = (
  itemList: Item[]
): ItemListLoadSuccessAction => {
  return {
    type: actionTypes.ITEM_LIST_LOAD_SUCCESS,
    itemList: itemList,
  };
};

export const itemListLoadFailure = (): ItemListLoadFailureAction => {
  return {
    type: actionTypes.ITEM_LIST_LOAD_FAILURE,
  };
};

export const getStorageItemList = (storageId: string): any => (
  dispatch: StoreDispatch
): any => {
  dispatch(itemListLoadStart());

  return axios
    .get(`items/list/${storageId}`)
    .then((res: AxiosResponse<Item[]>) => {
      dispatch(itemListLoadSuccess(res.data));
    })
    .catch((err) => {
      dispatch(itemListLoadFailure());
    });
};
