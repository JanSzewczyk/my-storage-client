import axios from "../../shared/config/axios";
import * as actionTypes from "../actionTypes";
import { updateObject } from "../../shared/utils/utility";

export const statisticStorageLoadStart = () => {
  return {
    type: actionTypes.STATISTIC_STORAGE_LOAD_START,
  };
};

export const statisticStorageLoadSuccess = (statisticsData) => {
  const statistics = statisticsData.map((stat) =>
    updateObject(stat, {
      date: new Date(stat.date),
    })
  );

  return {
    type: actionTypes.STATISTIC_STORAGE_LOAD_SUCCESS,
    statistics: statistics,
  };
};

export const statisticStorageLoadFail = () => {
  return {
    type: actionTypes.STATISTIC_STORAGE_LOAD_FAIL,
  };
};

export const getStorageStatistics = (storageId) => {
  return (dispatch) => {
    dispatch(statisticStorageLoadStart());

    axios
      .get(`storages/${storageId}/statistics`)
      .then((res) => {
        dispatch(statisticStorageLoadSuccess(res.data));
      })
      .catch((err) => {
        dispatch(statisticStorageLoadFail());
      });
  };
};
