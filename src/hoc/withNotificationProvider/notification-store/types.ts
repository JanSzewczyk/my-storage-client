import NotificationInfo from "../types/NotificationInfo";
import {
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE,
} from "./notificationActionTypes";

export interface NotificationState {
  notifications: NotificationInfo[];
}

export interface NotificationAddAction {
  type: typeof NOTIFICATION_ADD;
  newNotification: NotificationInfo;
}

export interface NotificationRemoveAction {
  type: typeof NOTIFICATION_REMOVE;
  id: string;
}

export type NotificationActionTypes =
  | NotificationAddAction
  | NotificationRemoveAction;
