import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";

const initialState = {
  storageStatistics: [],
  storageStatisticsLoading: true,
};

const statisticStorageLoadStart = (state, action) => {
  return updateObject(state, {
    storageStatistics: [],
    storageStatisticsLoading: true,
  });
};

const statisticStorageLoadSuccess = (state, action) => {
  return updateObject(state, {
    storageStatistics: action.statistics,
    storageStatisticsLoading: false,
  });
};

const statisticStorageLoadFail = (state, action) => {
  return updateObject(state, {
    storageStatisticsLoading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STATISTIC_STORAGE_LOAD_START:
      return statisticStorageLoadStart(state, action);
    case actionTypes.STATISTIC_STORAGE_LOAD_SUCCESS:
      return statisticStorageLoadSuccess(state, action);
    case actionTypes.STATISTIC_STORAGE_LOAD_FAIL:
      return statisticStorageLoadFail(state, action);
    default:
      return state;
  }
};

export default reducer;
