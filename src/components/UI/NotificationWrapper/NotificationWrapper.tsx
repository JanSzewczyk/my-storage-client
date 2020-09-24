import React, { ReactNode, useEffect, useRef } from "react";

import { dateToDateTimeString } from "../../../shared/utils/dateUtils";

import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";
import NotificationType from "../../../hoc/withNotificationProvider/types/NotificationType";

import "./NotificationWrapper.scss";

interface NotificationWrapperProps extends PropsWithChildren<ReactNode> {
  type: NotificationType;
  duration?: number | null;
  onRemove: () => void;
  timestamp?: Date;
}

const notificationWrapperDefaultProps = {
  duration: 10 * 1000,
};

const NotificationWrapper: React.FC<NotificationWrapperProps> = ({
  children,
  type,
  duration,
  onRemove,
  timestamp,
}) => {
  const removeRef: any = useRef();
  removeRef.current = onRemove;

  let notificationStyles = ["notification-wrapper"];
  type && notificationStyles.push(`notification-wrapper--${type}`);

  useEffect(() => {
    let id: any = null;

    if (duration) {
      id = setTimeout(() => removeRef.current(), duration);
    }

    return () => duration && id && clearTimeout(id);
  }, [duration]);

  return (
    <div className={notificationStyles.join(" ")} onClick={onRemove}>
      {timestamp && (
        <div className={"notification-wrapper__header"}>
          {dateToDateTimeString(timestamp)}
        </div>
      )}
      <div className={"notification-wrapper__content"}>{children}</div>
    </div>
  );
};

NotificationWrapper.defaultProps = notificationWrapperDefaultProps;

export default NotificationWrapper;
