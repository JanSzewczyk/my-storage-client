import axios from "../../shared/config/axios";
import * as actionTypes from "../actionTypes";

import { createSearchQuery } from "../../shared/utils/utility";
import browserHistory from "../../shared/config/history";
import {
  ActionStorageListLoadFailureAction,
  ActionStorageListLoadStartAction,
  ActionStorageListLoadSuccessAction,
} from "./types";
import PageInfo from "../../shared/types/common/PageInfo";
import StoreDispatch from "../../shared/types/store/StoreDispatch";
import { AxiosResponse } from "axios";
import PagedModel from "../../shared/types/apiResponse/PagedModel";
import ActionDto from "../../shared/types/action/ActionDto";
import { mapActionDtoToAction } from "../../shared/data-utils/actionUtils";
import { FixMeLater } from "../../shared/types/common/FixMeLater";
import { Query } from "../../hooks/useQuery";

export const actionStorageListLoadStart = (): ActionStorageListLoadStartAction => {
  return {
    type: actionTypes.ACTION_STORAGE_LIST_LOAD_START,
  };
};

export const actionStorageListLoadSuccess = (
  actionsList: ActionDto[],
  pageInfo: PageInfo
): ActionStorageListLoadSuccessAction => {
  return {
    type: actionTypes.ACTION_STORAGE_LIST_LOAD_SUCCESS,
    actions: actionsList.map(mapActionDtoToAction),
    pageInfo: pageInfo,
  };
};

export const actionStorageListLoadFailure = (): ActionStorageListLoadFailureAction => {
  return {
    type: actionTypes.ACTION_STORAGE_LIST_LOAD_FAILURE,
  };
};

export const getStorageActionsList = (
  storageId: string,
  queryData: Query
): any => (dispatch: StoreDispatch): any => {
  dispatch(actionStorageListLoadStart());

  const query = createSearchQuery(queryData);

  axios
    .get(`storage/${storageId}/actions${query}`)
    .then((res: AxiosResponse<PagedModel<ActionDto[]>>) => {
      dispatch(actionStorageListLoadSuccess(res.data.content, res.data.page));
    })
    .catch((err) => {
      dispatch(actionStorageListLoadFailure());
    });
};

// export const actionRemoveStart = () => {
//   return {
//     type: actionTypes.ACTION_REMOVE_START,
//   };
// };

// export const actionRemoveSuccess = () => {
//   return {
//     type: actionTypes.ACTION_REMOVE_SUCCESS,
//   };
// };

// export const actionRemoveFail = () => {
//   return {
//     type: actionTypes.ACTION_REMOVE_FAIL,
//   };
// };

export const removeAction = (removedItems: FixMeLater) => {
  return (dispatch: StoreDispatch) => {
    // dispatch(actionRemoveStart());

    axios
      .post(`actions/remove`, removedItems)
      .then((res) => {
        // dispatch(actionRemoveSuccess());
        // success("REMOVE action success");
        // TODO change logic
        browserHistory.push("/xxx");
        browserHistory.push("/");
      })
      .catch((err) => {
        // error(err.response ? err.response.data.message : "Server error");
        // dispatch(actionRemoveFail());
      });
  };
};

// export const actionStoreStart = () => {
//   return {
//     type: actionTypes.ACTION_STORE_START,
//   };
// };

// export const actionStoreSuccess = () => {
//   return {
//     type: actionTypes.ACTION_STORE_SUCCESS,
//   };
// };

// export const actionStoreFail = () => {
//   return {
//     type: actionTypes.ACTION_STORE_FAIL,
//   };
// };

export const storeAction = (storedItems: FixMeLater) => {
  return (dispatch: StoreDispatch) => {
    // dispatch(actionStoreStart());

    axios
      .post(`actions/store`, storedItems)
      .then((res) => {
        // dispatch(actionStoreSuccess());
        // success("STORE action success");
        // TODO change logic
        browserHistory.push("/xxx");
        browserHistory.push("/");
      })
      .catch((err) => {
        // error(err.response ? err.response.data.message : "Server error");
        // dispatch(actionStoreFail());
      });
  };
};
