import withNotificationProvider from "./withNotificationProvider";
import {
  reducer,
  initialState,
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE,
} from "./notification-store/notification-reducer";
import NotificationContext from "./notification-context/notification-context";

export {
  reducer,
  initialState,
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE,
  NotificationContext,
};
export default withNotificationProvider;
