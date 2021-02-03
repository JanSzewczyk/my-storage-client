import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  ActionActionTypes,
  ActionListLoadFailureAction,
  ActionListLoadStartAction,
  ActionListLoadSuccessAction,
  ActionStoreState,
  InitActionStoreAction,
} from "./types";

const initialState: ActionStoreState = {
  actionList: [],
  pageInfo: null,
  actionsListLoading: true,
};

const initActionStore = (
  state: ActionStoreState,
  action: InitActionStoreAction
): ActionStoreState => {
  return initialState;
};

const actionListLoadStart = (
  state: ActionStoreState,
  action: ActionListLoadStartAction
): ActionStoreState => {
  return updateObject(state, {
    actionList: [],
    pageInfo: null,
    actionsListLoading: true,
  });
};

const actionListLoadSuccess = (
  state: ActionStoreState,
  action: ActionListLoadSuccessAction
): ActionStoreState => {
  return updateObject(state, {
    actionList: action.actions,
    pageInfo: action.pageInfo,
    actionsListLoading: false,
  });
};

const actionListLoadFailure = (
  state: ActionStoreState,
  action: ActionListLoadFailureAction
): ActionStoreState => {
  return updateObject(state, {
    actionListLoading: false,
  });
};

const reducer = (
  state = initialState,
  action: ActionActionTypes
): ActionStoreState => {
  switch (action.type) {
    case actionTypes.INIT_ACTION_STORE:
      return initActionStore(state, action);

    case actionTypes.ACTION_LIST_LOAD_START:
      return actionListLoadStart(state, action);
    case actionTypes.ACTION_LIST_LOAD_SUCCESS:
      return actionListLoadSuccess(state, action);
    case actionTypes.ACTION_LIST_LOAD_FAILURE:
      return actionListLoadFailure(state, action);

    default:
      return state;
  }
};

export default reducer;
