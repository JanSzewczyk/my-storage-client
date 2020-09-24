import { ReactNode } from "react";
import NotificationType from "./NotificationType";

export default interface AddNotification {
  content: ReactNode;
  type?: NotificationType;
  duration?: number | null;
}
