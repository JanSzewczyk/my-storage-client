import { ReactNode } from "react";

export declare type NotificationContextValue = {
  add: ({ content, type, duration }: AddNotification) => void;
  remove: (id: string) => void;
};

export declare type AddNotification = {
  content: ReactNode;
  type?: NotificationType;
  duration?: number | null;
};

export declare type NotificationInfo = {
  content: ReactNode;
  duration: number | null;
  id: string;
  timestamp: Date;
  type: NotificationType;
};

export declare type NotificationType = "info" | "success" | "error";
