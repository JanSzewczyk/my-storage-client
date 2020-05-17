import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  storageList: [],
  storageListLoading: true,
};

const storageListStart = (state, action) => {
  return updateObject(state, { storageList: [], storageListLoading: true });
};

const storageListSuccess = (state, action) => {
  return updateObject(state, {
    storageList: action.storages,
    storageListLoading: false,
  });
};

const storageListFail = (state, action) => {
  return updateObject(state, {
    storageListLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORAGE_LIST_START:
      return storageListStart(state, action);
    case actionTypes.STORAGE_LIST_SUCCESS:
      return storageListSuccess(state, action);
    case actionTypes.STORAGE_LIST_FAIL:
      return storageListFail(state, action);
    default:
      return state;
  }
};

export default reducer;
