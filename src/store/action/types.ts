import Action from "../../shared/types/action/Action";
import PageInfo from "../../shared/types/common/PageInfo";
import * as actionTypes from "../actionTypes";

export interface ActionStoreState {
  actionList: Action[];
  pageInfo: PageInfo | null;
  actionsListLoading: boolean;
}

export interface InitActionStoreAction {
  type: typeof actionTypes.INIT_ACTION_STORE;
}

export interface ActionListLoadStartAction {
  type: typeof actionTypes.ACTION_LIST_LOAD_START;
}

export interface ActionListLoadSuccessAction {
  type: typeof actionTypes.ACTION_LIST_LOAD_SUCCESS;
  actions: Action[];
  pageInfo: PageInfo;
}

export interface ActionListLoadFailureAction {
  type: typeof actionTypes.ACTION_LIST_LOAD_FAILURE;
}

export type ActionActionTypes =
  | InitActionStoreAction
  | ActionListLoadStartAction
  | ActionListLoadSuccessAction
  | ActionListLoadFailureAction;
