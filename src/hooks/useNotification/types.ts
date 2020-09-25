import { ReactNode } from "react";
import { NotificationContextValue } from "../../hoc/withNotificationProvider/types";

export interface UseNotificationMethods extends NotificationContextValue {
  info: ({ content, duration }: NotificationMethodArguments) => void;
  success: ({ content, duration }: NotificationMethodArguments) => void;
  error: ({ content, duration }: NotificationMethodArguments) => void;
}

export declare type NotificationMethodArguments = {
  content: ReactNode;
  duration?: number | null;
};
