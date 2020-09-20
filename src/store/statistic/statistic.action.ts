import axios from "../../shared/config/axios";
import * as actionTypes from "../actionTypes";
import StoreDispatch from "../../shared/types/store/StoreDispatch";
import {
  StatisticStorageLoadFailureAction,
  StatisticStorageLoadStartAction,
  StatisticStorageLoadSuccessAction,
} from "./types";
import StorageStatisticDto from "../../shared/types/statistic/StorageStatisticDto";
import { AxiosResponse } from "axios";
import { mapStorageStatisticDtoToStorageStatistic } from "../../shared/data-utils/statisticUtils";

export const statisticStorageLoadStart = (): StatisticStorageLoadStartAction => {
  return {
    type: actionTypes.STATISTIC_STORAGE_LOAD_START,
  };
};

export const statisticStorageLoadSuccess = (
  statisticsData: StorageStatisticDto[]
): StatisticStorageLoadSuccessAction => {
  return {
    type: actionTypes.STATISTIC_STORAGE_LOAD_SUCCESS,
    statistics: statisticsData.map(mapStorageStatisticDtoToStorageStatistic)
  };
};

export const statisticStorageLoadFailure = (): StatisticStorageLoadFailureAction => {
  return {
    type: actionTypes.STATISTIC_STORAGE_LOAD_FAILURE,
  };
};

export const getStorageStatistics = (storageId: string): any => (
  dispatch: StoreDispatch
): any => {
  dispatch(statisticStorageLoadStart());

  axios
    .get(`storages/${storageId}/statistics`)
    .then((res: AxiosResponse<StorageStatisticDto[]>) => {
      dispatch(statisticStorageLoadSuccess(res.data));
    })
    .catch((err) => {
      dispatch(statisticStorageLoadFailure());
    });
};
