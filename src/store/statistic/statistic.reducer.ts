import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  StatisticActionTypes,
  StatisticState,
  StatisticStorageLoadFailureAction,
  StatisticStorageLoadStartAction,
  StatisticStorageLoadSuccessAction,
} from "./types";

const initialState: StatisticState = {
  storageStatistics: [],
  storageStatisticsLoading: true,
};

const statisticStorageLoadStart = (
  state: StatisticState,
  action: StatisticStorageLoadStartAction
): StatisticState => {
  return updateObject(state, {
    storageStatistics: [],
    storageStatisticsLoading: true,
  });
};

const statisticStorageLoadSuccess = (
  state: StatisticState,
  action: StatisticStorageLoadSuccessAction
): StatisticState => {
  return updateObject(state, {
    storageStatistics: action.statistics,
    storageStatisticsLoading: false,
  });
};

const statisticStorageLoadFailure = (
  state: StatisticState,
  action: StatisticStorageLoadFailureAction
): StatisticState => {
  return updateObject(state, {
    storageStatisticsLoading: false,
  });
};

const reducer = (
  state = initialState,
  action: StatisticActionTypes
): StatisticState => {
  switch (action.type) {
    case actionTypes.STATISTIC_STORAGE_LOAD_START:
      return statisticStorageLoadStart(state, action);
    case actionTypes.STATISTIC_STORAGE_LOAD_SUCCESS:
      return statisticStorageLoadSuccess(state, action);
    case actionTypes.STATISTIC_STORAGE_LOAD_FAILURE:
      return statisticStorageLoadFailure(state, action);
    default:
      return state;
  }
};

export default reducer;
