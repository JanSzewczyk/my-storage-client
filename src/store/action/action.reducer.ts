import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  ActionActionTypes,
  ActionState,
  ActionStorageListLoadFailureAction,
  ActionStorageListLoadStartAction,
  ActionStorageListLoadSuccessAction,
} from "./types";

const initialState: ActionState = {
  actionsList: [],
  pageInfo: null,
  actionsListLoading: true,
  actionSRLoading: false,
};

const actionStorageListLoadStart = (
  state: ActionState,
  action: ActionStorageListLoadStartAction
): ActionState => {
  return updateObject(state, {
    actionsList: [],
    pageInfo: null,
    actionsListLoading: true,
  });
};

const actionStorageListLoadSuccess = (
  state: ActionState,
  action: ActionStorageListLoadSuccessAction
): ActionState => {
  return updateObject(state, {
    actionsList: action.actions,
    pageInfo: action.pageInfo,
    actionsListLoading: false,
  });
};

const actionStorageListLoadFail = (
  state: ActionState,
  action: ActionStorageListLoadFailureAction
): ActionState => {
  return updateObject(state, {
    actionsListLoading: false,
  });
};

// const actionOnStorageStart = (state, action) => {
//   return updateObject(state, {
//     actionSRLoading: true,
//   });
// };

// const actionOnStorageSuccess = (state, action) => {
//   return updateObject(state, {
//     actionSRLoading: false,
//   });
// };

// const actionOnStorageFail = (state, action) => {
//   return updateObject(state, {
//     actionSRLoading: false,
//   });
// };

const reducer = (
  state = initialState,
  action: ActionActionTypes
): ActionState => {
  switch (action.type) {
    case actionTypes.ACTION_STORAGE_LIST_LOAD_START:
      return actionStorageListLoadStart(state, action);
    case actionTypes.ACTION_STORAGE_LIST_LOAD_SUCCESS:
      return actionStorageListLoadSuccess(state, action);
    case actionTypes.ACTION_STORAGE_LIST_LOAD_FAILURE:
      return actionStorageListLoadFail(state, action);

    // case actionTypes.ACTION_REMOVE_START:
    //   return actionOnStorageStart(state, action);
    // case actionTypes.ACTION_REMOVE_SUCCESS:
    //   return actionOnStorageSuccess(state, action);
    // case actionTypes.ACTION_REMOVE_FAIL:
    //   return actionOnStorageFail(state, action);

    // case actionTypes.ACTION_STORE_START:
    //   return actionOnStorageStart(state, action);
    // case actionTypes.ACTION_STORE_SUCCESS:
    //   return actionOnStorageSuccess(state, action);
    // case actionTypes.ACTION_STORE_FAIL:
    //   return actionOnStorageFail(state, action);

    default:
      return state;
  }
};

export default reducer;
