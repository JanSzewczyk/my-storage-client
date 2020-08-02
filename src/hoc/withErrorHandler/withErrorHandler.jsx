import React, { useLayoutEffect } from "react";

import _ from "lodash";

import useNotification from "../../hooks/useNotification";
import ApiErrorMessage from "./ApiErrorMessage/ApiErrorMessage";

import axios from "../../shared/config/axios";

const withErrorHandler = (Component, ignoreStatus = []) => {
  
  const WithErrorHandler = (props) => {
    const notification = useNotification();

    useLayoutEffect(() => {
      const xxx = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response) {
            if (!_.includes(ignoreStatus, Number(error.response.status))) {
              const responseData = error.response.data;

              const errorMessage = (
                <ApiErrorMessage
                  url={error.config.url}
                  message={
                    responseData.message
                      ? responseData.message
                      : responseData.title
                  }
                  status={responseData.status}
                  error={
                    responseData.error && getErrorMessage(responseData.error)
                  }
                />
              );
              notification.add(errorMessage, "error", null);
            }
          } else {
            const errorMessage = (
              <ApiErrorMessage url={error.config.url} message={error.message} />
            );
            notification.add(errorMessage, "error", null);
          }

          return Promise.reject(error);
        }
      );

      return () => {
        axios.interceptors.response.eject(xxx);
        console.log("useEffect return()");
      };
    }, [notification]);

    const getErrorMessage = (errorMessage) => {
      let message = "";

      if (
        errorMessage &&
        errorMessage.length > 0 &&
        Array.isArray(errorMessage)
      ) {
        message = errorMessage.join("\n");
      } else {
        message = `${errorMessage}`;
      }

      return message;
    };

    return <Component {...props} />;
  };

  return WithErrorHandler;
};

export default withErrorHandler;
