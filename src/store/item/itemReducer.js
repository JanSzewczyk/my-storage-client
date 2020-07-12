import * as actionTypes from "../actionTypes";
import { updateObject } from "@utils/utility";

const initialState = {
  itemsList: [],
  pageInfo: null,
  itemsListLoading: true,
};

const itemStorageListLoadStart = (state, action) => {
  return updateObject(state, {
    itemsList: [],
    pageInfo: null,
    itemsListLoading: true,
  });
};

const itemStorageListLoadSuccess = (state, action) => {
  return updateObject(state, {
    itemsList: action.items,
    pageInfo: action.pageInfo,
    itemsListLoading: false,
  });
};

const itemStorageListLoadFail = (state, action) => {
  return updateObject(state, {
    itemsListLoading: false,
  });
};

const itemStorageListEmployeeLoadStart = (state, action) => {
  return updateObject(state, {
    itemsList: [],
    itemsListLoading: true,
  });
};

const itemStorageListEmployeeLoadSuccess = (state, action) => {
  return updateObject(state, {
    itemsList: action.items,
    itemsListLoading: false,
  });
};

const itemStorageListEmployeeLoadFail = (state, action) => {
  return updateObject(state, {
    itemsListLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ITEM_STORAGE_LIST_LOAD_START:
      return itemStorageListLoadStart(state, action);
    case actionTypes.ITEM_STORAGE_LIST_LOAD_SUCCESS:
      return itemStorageListLoadSuccess(state, action);
    case actionTypes.ITEM_STORAGE_LIST_LOAD_FAIL:
      return itemStorageListLoadFail(state, action);

    case actionTypes.ITEM_STORAGE_EMPLOYEE_LIST_LOAD_START:
      return itemStorageListEmployeeLoadStart(state, action);
    case actionTypes.ITEM_STORAGE_EMPLOYEE_LIST_LOAD_SUCCESS:
      return itemStorageListEmployeeLoadSuccess(state, action);
    case actionTypes.ITEM_STORAGE_EMPLOYEE_LIST_LOAD_FAIL:
      return itemStorageListEmployeeLoadFail(state, action);
    default:
      return state;
  }
};

export default reducer;
