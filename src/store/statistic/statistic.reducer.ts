import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";
import {
  InitStatisticStoreAction,
  StatisticActionTypes,
  StatisticStoreState,
  StatisticStorageLoadFailureAction,
  StatisticStorageLoadStartAction,
  StatisticStorageLoadSuccessAction,
} from "./types";

const initialState: StatisticStoreState = {
  storageStatistics: [],
  storageStatisticsLoading: true,
};

const initStatisticStore = (
  state: StatisticStoreState,
  action: InitStatisticStoreAction
): StatisticStoreState => {
  return initialState;
};

const statisticStorageLoadStart = (
  state: StatisticStoreState,
  action: StatisticStorageLoadStartAction
): StatisticStoreState => {
  return updateObject(state, {
    storageStatistics: [],
    storageStatisticsLoading: true,
  });
};

const statisticStorageLoadSuccess = (
  state: StatisticStoreState,
  action: StatisticStorageLoadSuccessAction
): StatisticStoreState => {
  return updateObject(state, {
    storageStatistics: action.statistics,
    storageStatisticsLoading: false,
  });
};

const statisticStorageLoadFailure = (
  state: StatisticStoreState,
  action: StatisticStorageLoadFailureAction
): StatisticStoreState => {
  return updateObject(state, {
    storageStatisticsLoading: false,
  });
};

const reducer = (
  state = initialState,
  action: StatisticActionTypes
): StatisticStoreState => {
  switch (action.type) {
    case actionTypes.INIT_STATISTIC_STORE:
      return initStatisticStore(state, action);

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
