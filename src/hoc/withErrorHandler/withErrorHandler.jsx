import React, { useEffect } from "react";

import _ from "lodash";

import useNotification from "../../hooks/useNotification/useNotification";
import ApiErrorMessage from "./ApiErrorMessage/ApiErrorMessage";

import axios from "../../shared/config/axios";

const withErrorHandler = (Component, ignoreStatus = []) => {
  const WithErrorHandler = (props) => {
    const notification = useNotification();

    useEffect(() => {
      console.log("useEffect");
      const responseInterceptor = axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          console.log("elloo");
          if (error.response) {
            if (!_.includes(ignoreStatus, Number(error.response.status))) {
              const responseData = error.response.data;

              const errorMessage = (
                <ApiErrorMessage
                  url={error.config.url}
                  message={responseData.message}
                  status={responseData.status}
                  error={getErrorMessage(responseData.error)}
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

      return () => axios.interceptors.response.eject(responseInterceptor);
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
