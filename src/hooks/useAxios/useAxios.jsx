/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useCallback } from "react";

import { reducer, initialState, actions } from "./axios-store/axios-reducer";

import axios from "../../shared/config/axios";

// import * as defaultAxios from "axios";
// const CancelToken = axios.CancelToken;

// TODO refactor this hook !!!

const useAxios = ({
  url,
  method = "get",
  options = {},
  storyState = initialState,
  // trigger,
  // // @deprecated
  // filter,
  // forceDispatchEffect,
  // customHandler,
}) => {
  const [results, dispatch] = useReducer(reducer, storyState);
  // const [innerTrigger, setInnerTrigger] = useState(0);

  // let outerTrigger = trigger;

  // try {
  //   outerTrigger = JSON.stringify(trigger);
  // } catch (err) {
  //   console.warn("Problem with JSON.stringify(trigger)!!!");
  // }

  // const dispatchEffect = forceDispatchEffect || filter || (() => true);

  // const handler = (error, response) => {
  //   if (customHandler) {
  //     customHandler(error, response);
  //   }
  // };

  // useEffect(() => {
  //   // if (!url || !dispatchEffect()) return;
  //   // ONLY trigger by query
  //   if (typeof outerTrigger === "undefined" && !innerTrigger) return;

  //   // handler(null, null);
  //   dispatch({ type: actions.init });

  //   // const source = CancelToken.source();

  //   axios({
  //     url,
  //     method,
  //     ...options,
  //   //   cancelToken: source.token,
  //   })
  //     .then((response) => {
  //       // handler(null, response);
  //       dispatch({ type: actions.success, payload: response });
  //     })
  //     .catch((error) => {
  //       // handler(error, null);
  //       if (!axios.isCancel(error)) {
  //         dispatch({ type: actions.fail, payload: error });
  //       }
  //     });

  //   // return () => {
  //   //   source.cancel();
  //   // };
  // }, [innerTrigger, method, options, outerTrigger, url]);

  const sendRequest = useCallback(() => {
    dispatch({ type: actions.init, initResponse: storyState.response });
    axios({
      url,
      method,
      ...options,
    })
      .then((response) => {
        dispatch({ type: actions.success, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: actions.fail, payload: error });
      });
  }, []);

  return [sendRequest, { ...results }];
};

export default useAxios;
