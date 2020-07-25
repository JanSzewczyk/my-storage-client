import React, { useEffect } from "react";

import { useNotification } from "../withNotificationProvider";

import axios from "../../shared/config/axios";

const withErrorHandler = (Component) => {
  const WithErrorHandler = (props) => {
    const notification = useNotification();

    useEffect(() => {
      const responseInterceptor = axios.interceptors.response.use(
        (response) => {
        //   console.log(response.data);
        //   console.log(response.status);
        //   console.log(response.statusText);
        //   console.log(response.headers);
        //   console.log(response.config);

          return response;
        },
        (error) => {
          //   console.error("Error response::", error.response);
          //   console.error("Error config::", error.config);
          //   console.error("Error Message::", error.message);
          //   console.error("Error name::", error.name);
          //   console.error("Error statusCode::", error.status);
          //   console.error("Error errno::", error.errno);
          //   console.error("Error syscall::", error.syscall);
          //   console.error("Error stack::", error.stack);
          //   console.error("Error request::", error.request);
          notification.add(error.message, "error");
          // Do something with response error
          return Promise.reject(error);
        }
      );

      return () => axios.interceptors.response.eject(responseInterceptor);
    }, [notification]);

    return <Component {...props} />;
  };

  return WithErrorHandler;
};

export default withErrorHandler;
