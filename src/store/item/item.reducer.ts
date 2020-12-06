import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  InitItemStoreAction,
  ItemActionTypes,
  ItemListLoadFailureAction,
  ItemListLoadStartAction,
  ItemListLoadSuccessAction,
  ItemStoreState,
  ItemViewListLoadFailureAction,
  ItemViewListLoadStartAction,
  ItemViewListLoadSuccessAction,
} from "./types";

export const initialState: ItemStoreState = {
  itemViewList: [],
  pageInfo: null,
  itemViewListLoading: true,
  itemList: [],
  itemListLoading: true,
};

const initItemStore = (
  state: ItemStoreState,
  action: InitItemStoreAction
): ItemStoreState => {
  return initialState;
};

const itemViewListLoadStart = (
  state: ItemStoreState,
  action: ItemViewListLoadStartAction
): ItemStoreState => {
  return updateObject(state, {
    itemViewList: [],
    pageInfo: null,
    itemViewListLoading: true,
  });
};

const itemViewListLoadSuccess = (
  state: ItemStoreState,
  action: ItemViewListLoadSuccessAction
): ItemStoreState => {
  return updateObject(state, {
    itemViewList: action.itemViewList,
    pageInfo: action.pageInfo,
    itemViewListLoading: false,
  });
};

const itemViewListLoadFailure = (
  state: ItemStoreState,
  action: ItemViewListLoadFailureAction
): ItemStoreState => {
  return updateObject(state, {
    itemViewListLoading: false,
  });
};

const itemListLoadStart = (
  state: ItemStoreState,
  action: ItemListLoadStartAction
): ItemStoreState => {
  return updateObject(state, {
    itemList: [],
    itemListLoading: true,
  });
};

const itemListLoadSuccess = (
  state: ItemStoreState,
  action: ItemListLoadSuccessAction
): ItemStoreState => {
  return updateObject(state, {
    itemList: action.itemList,
    itemListLoading: false,
  });
};

const itemListLoadFailure = (
  state: ItemStoreState,
  action: ItemListLoadFailureAction
): ItemStoreState => {
  return updateObject(state, {
    itemListLoading: false,
  });
};

const reducer = (
  state = initialState,
  action: ItemActionTypes
): ItemStoreState => {
  switch (action.type) {
    case actionTypes.ITEM_INIT:
      return initItemStore(state, action);

    case actionTypes.ITEM_VIEW_LIST_LOAD_START:
      return itemViewListLoadStart(state, action);
    case actionTypes.ITEM_VIEW_LIST_LOAD_SUCCESS:
      return itemViewListLoadSuccess(state, action);
    case actionTypes.ITEM_VIEW_LIST_LOAD_FAILURE:
      return itemViewListLoadFailure(state, action);

    case actionTypes.ITEM_LIST_LOAD_START:
      return itemListLoadStart(state, action);
    case actionTypes.ITEM_LIST_LOAD_SUCCESS:
      return itemListLoadSuccess(state, action);
    case actionTypes.ITEM_LIST_LOAD_FAILURE:
      return itemListLoadFailure(state, action);
    default:
      return state;
  }
};

export default reducer;
