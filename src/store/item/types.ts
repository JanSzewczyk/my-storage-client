import PageInfo from "../../shared/types/common/PageInfo";
import Item from "../../shared/types/item/Item";
import ItemView from "../../shared/types/item/ItemView";
import * as actionTypes from "../actionTypes";

export interface ItemStoreState {
  itemViewList: ItemView[];
  pageInfo: PageInfo | null;
  itemViewListLoading: boolean;
  itemList: Item[];
  itemListLoading: boolean;
}

export interface InitItemStoreAction {
  type: typeof actionTypes.ITEM_INIT;
}

export interface ItemViewListLoadStartAction {
  type: typeof actionTypes.ITEM_VIEW_LIST_LOAD_START;
}

export interface ItemViewListLoadSuccessAction {
  type: typeof actionTypes.ITEM_VIEW_LIST_LOAD_SUCCESS;
  itemViewList: ItemView[];
  pageInfo: PageInfo;
}

export interface ItemViewListLoadFailureAction {
  type: typeof actionTypes.ITEM_VIEW_LIST_LOAD_FAILURE;
}

export interface ItemListLoadStartAction {
  type: typeof actionTypes.ITEM_LIST_LOAD_START;
}

export interface ItemListLoadSuccessAction {
  type: typeof actionTypes.ITEM_LIST_LOAD_SUCCESS;
  itemList: Item[];
}

export interface ItemListLoadFailureAction {
  type: typeof actionTypes.ITEM_LIST_LOAD_FAILURE;
}

export type ItemActionTypes =
  | InitItemStoreAction
  | ItemViewListLoadStartAction
  | ItemViewListLoadSuccessAction
  | ItemViewListLoadFailureAction
  | ItemListLoadStartAction
  | ItemListLoadSuccessAction
  | ItemListLoadFailureAction;
