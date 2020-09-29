import { useContext, useCallback } from "react";
import { UseNotificationMethods, NotificationMethodArguments } from ".";
import NotificationContext from "../../hoc/withNotificationProvider/notification-context/notification-context";
import { NotificationContextValue } from "../../hoc/withNotificationProvider/types";

const useNotification = (): UseNotificationMethods => {
  const context: NotificationContextValue = useContext(NotificationContext);

  const info = useCallback(
    ({ content, duration }: NotificationMethodArguments) => {
      context.add({ content, duration, type: "info" });
    },
    [context]
  );

  const success = useCallback(
    ({ content, duration }: NotificationMethodArguments) => {
      context.add({ content, duration, type: "success" });
    },
    [context]
  );

  const error = useCallback(
    ({ content, duration }: NotificationMethodArguments) => {
      context.add({ content, duration, type: "error" });
    },
    [context]
  );

  return { add: context.add, remove: context.remove, info, success, error };
};

export default useNotification;
