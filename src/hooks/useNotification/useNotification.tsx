import { useContext, useCallback, useMemo } from "react";
import { UseNotificationMethods, NotificationMethodArguments } from ".";
import NotificationContext from "../../hoc/withNotificationProvider/notification-context/notification-context";
import { NotificationContextValue } from "../../hoc/withNotificationProvider/types";

const useNotification = (): UseNotificationMethods => {
  const context: NotificationContextValue = useContext(NotificationContext);

  const info = useCallback(
    (config: NotificationMethodArguments | string) => {
      if (typeof config !== "string")
        context.add({
          content: config.content,
          duration: config.duration,
          type: "info",
        });
      else
        context.add({
          content: config,
          type: "info",
        });
    },
    [context]
  );

  const success = useCallback(
    (config: NotificationMethodArguments | string) => {
      if (typeof config !== "string")
        context.add({
          content: config.content,
          duration: config.duration,
          type: "success",
        });
      else
        context.add({
          content: config,
          type: "success",
        });
    },
    [context]
  );

  const warning = useCallback(
    (config: NotificationMethodArguments | string) => {
      if (typeof config !== "string")
        context.add({
          content: config.content,
          duration: config.duration,
          type: "warning",
        });
      else
        context.add({
          content: config,
          type: "warning",
        });
    },
    [context]
  );

  const error = useCallback(
    (config: NotificationMethodArguments | string) => {
      if (typeof config !== "string")
        context.add({
          content: config.content,
          duration: config.duration,
          type: "error",
        });
      else
        context.add({
          content: config,
          type: "error",
        });
    },
    [context]
  );
  
  return useMemo(
    () => ({
      add: context.add,
      remove: context.remove,
      info,
      error,
      warning,
      success,
    }),
    [context.add, context.remove, error, info, success, warning]
  );
};

export default useNotification;
