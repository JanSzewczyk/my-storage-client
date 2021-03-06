import React, { useLayoutEffect } from "react";

import _ from "lodash";

import useNotification from "../../hooks/useNotification";
import axios from "../../shared/config/axios";

import ApiErrorMessage from "./ApiErrorMessage/ApiErrorMessage";

const withErrorHandler = <E,>(
  Component: React.ComponentType<E>,
  ignoreStatus: number[] = []
) => {
  const WithErrorHandler = (props: E) => {
    const notification = useNotification();

    useLayoutEffect(() => {
      const responseInterceptor = axios.interceptors.response.use(
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

              notification.add({
                content: errorMessage,
                type: "error",
                duration: null,
              });
            }
          } else {
            const errorMessage = (
              <ApiErrorMessage url={error.config.url} message={error.message} />
            );

            notification.add({
              content: errorMessage,
              type: "error",
              duration: null,
            });
          }

          return Promise.reject(error);
        }
      );

      return () => {
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, [notification]);

    const getErrorMessage = (errorMessage: string) => {
      let message: string = "";

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
