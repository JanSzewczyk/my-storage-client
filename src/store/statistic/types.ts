import StorageStatistic from "../../shared/types/statistic/StorageStatistic";
import * as actionTypes from "../actionTypes";

export interface StatisticStoreState {
  storageStatistics: StorageStatistic[];
  storageStatisticsLoading: boolean;
}

export interface InitStatisticStoreAction {
  type: typeof actionTypes.INIT_STATISTIC_STORE;
}

export interface StatisticStorageLoadStartAction {
  type: typeof actionTypes.STATISTIC_STORAGE_LOAD_START;
}

export interface StatisticStorageLoadSuccessAction {
  type: typeof actionTypes.STATISTIC_STORAGE_LOAD_SUCCESS;
  statistics: StorageStatistic[];
}

export interface StatisticStorageLoadFailureAction {
  type: typeof actionTypes.STATISTIC_STORAGE_LOAD_FAILURE;
}

export type StatisticActionTypes =
  | InitStatisticStoreAction
  | StatisticStorageLoadStartAction
  | StatisticStorageLoadSuccessAction
  | StatisticStorageLoadFailureAction;
