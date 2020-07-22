import { useEffect, useReducer, useCallback } from "react";

import { reducer, initialState, actions } from "./use-axios-reducer";
import axios from "../../shared/config/axios";

// import * as defaultAxios from "axios";
// const CancelToken = axios.CancelToken;

const useAxios = ({
  url,
  method = "get",
  options = {},
  // trigger,
  // // @deprecated
  // filter,
  // forceDispatchEffect,
  // customHandler,
}) => {
  const [results, dispatch] = useReducer(reducer, initialState);
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
    dispatch({ type: actions.init });

    axios({
      url,
      method,
      ...options,
    })
      .then((response) => {
        dispatch({ type: actions.success, payload: response });
      })

      .catch((error) => {
        dispatch({ type: actions.fail, payload: error });
      });
  }, [method, options, url]);

  return {
    sendRequest,
    ...results,
    // @deprecated
    // query: () => {
    //   setInnerTrigger(+new Date());
    // },
    // reFetch: () => {
    //   setInnerTrigger(+new Date());
    // },
  };
};

export default useAxios;
