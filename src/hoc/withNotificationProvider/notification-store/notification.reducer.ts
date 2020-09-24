import {
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE,
} from "./notificationActionTypes";
import { NotificationActionTypes, NotificationState } from "./types";

export const initialState: NotificationState = {
  notifications: [],
};

export const reducer = (
  state = initialState,
  action: NotificationActionTypes
): NotificationState => {
  switch (action.type) {
    case NOTIFICATION_ADD:
      return {
        notifications: [...state.notifications, action.newNotification],
      };
    case NOTIFICATION_REMOVE:
      return {
        notifications: state.notifications.filter((t) => t.id !== action.id),
      };
    default:
      return initialState;
  }
};
