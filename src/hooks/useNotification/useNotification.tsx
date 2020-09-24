import { useContext } from "react";
import NotificationContext from "../../hoc/withNotificationProvider/notification-context/notification-context";
import AddNotification from "../../hoc/withNotificationProvider/types/AddNotification";

interface ReturnUseNotification {
  add: ({ content, type, duration }: AddNotification) => void;
  remove: (id: string) => void;
}

const useNotification = (): ReturnUseNotification => {
  const context: any = useContext(NotificationContext);

  return { add: context.add, remove: context.remove };
};

export default useNotification;
