import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  ItemActionTypes,
  ItemListLoadFailureAction,
  ItemListLoadStartAction,
  ItemListLoadSuccessAction,
  ItemState,
  ItemViewListLoadFailureAction,
  ItemViewListLoadStartAction,
  ItemViewListLoadSuccessAction,
} from "./types";

const initialState: ItemState = {
  itemViewList: [],
  pageInfo: null,
  itemViewListLoading: true,
  itemList: [],
  itemListLoading: true,
};

const itemViewListLoadStart = (
  state: ItemState,
  action: ItemViewListLoadStartAction
): ItemState => {
  return updateObject(state, {
    itemViewList: [],
    pageInfo: null,
    itemViewListLoading: true,
  });
};

const itemViewListLoadSuccess = (
  state: ItemState,
  action: ItemViewListLoadSuccessAction
): ItemState => {
  return updateObject(state, {
    itemViewList: action.itemViewList,
    pageInfo: action.pageInfo,
    itemViewListLoading: false,
  });
};

const itemViewListLoadFailure = (
  state: ItemState,
  action: ItemViewListLoadFailureAction
): ItemState => {
  return updateObject(state, {
    itemViewListLoading: false,
  });
};

const itemListLoadStart = (
  state: ItemState,
  action: ItemListLoadStartAction
): ItemState => {
  return updateObject(state, {
    itemsList: [],
    itemListLoading: true,
  });
};

const itemListLoadSuccess = (
  state: ItemState,
  action: ItemListLoadSuccessAction
): ItemState => {
  return updateObject(state, {
    itemsList: action.itemList,
    itemListLoading: false,
  });
};

const itemListLoadFailure = (
  state: ItemState,
  action: ItemListLoadFailureAction
): ItemState => {
  return updateObject(state, {
    itemListLoading: false,
  });
};

const reducer = (state = initialState, action: ItemActionTypes): ItemState => {
  switch (action.type) {
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
