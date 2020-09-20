import Action from "../../shared/types/action/Action";
import PageInfo from "../../shared/types/common/PageInfo";
import * as actionTypes from "../actionTypes";

export interface ActionState {
  actionsList: Action[];
  pageInfo: PageInfo | null;
  actionsListLoading: boolean;
  actionSRLoading: boolean;
}

export interface ActionStorageListLoadStartAction {
  type: typeof actionTypes.ACTION_STORAGE_LIST_LOAD_START;
}

export interface ActionStorageListLoadSuccessAction {
  type: typeof actionTypes.ACTION_STORAGE_LIST_LOAD_SUCCESS;
  actions: Action[];
  pageInfo: PageInfo;
}

export interface ActionStorageListLoadFailureAction {
  type: typeof actionTypes.ACTION_STORAGE_LIST_LOAD_FAILURE;
}

export type ActionActionTypes =
  | ActionStorageListLoadStartAction
  | ActionStorageListLoadSuccessAction
  | ActionStorageListLoadFailureAction;
