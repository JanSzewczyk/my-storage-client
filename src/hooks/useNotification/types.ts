import { ReactNode } from "react";
import { NotificationContextValue } from "../../hoc/withNotificationProvider/types";

export declare type UseNotificationMethods = NotificationContextValue & {
  info: (config: NotificationMethodArguments | string) => void;
  success: (config: NotificationMethodArguments | string) => void;
  warning: (config: NotificationMethodArguments | string) => void;
  error: (config: NotificationMethodArguments | string) => void;
};

export declare type NotificationMethodArguments = {
  content: ReactNode;
  duration?: number | null;
};
