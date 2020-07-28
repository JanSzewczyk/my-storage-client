import { useContext } from "react";
import NotificationContext from "../../hoc/withNotificationProvider/notification-context/notification-context";

const useNotification = () => {
  const context = useContext(NotificationContext);

  return { add: context.add, remove: context.remove };
};

export default useNotification;
