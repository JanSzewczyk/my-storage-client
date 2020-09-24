import { ReactNode } from "react";
import NotificationType from "./NotificationType";

export default interface NotificationInfo {
  content: ReactNode;
  duration: number | null;
  id: string;
  timestamp: Date;
  type: NotificationType;
}
