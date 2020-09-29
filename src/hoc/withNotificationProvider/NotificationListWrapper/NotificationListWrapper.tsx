import React, { ReactNode } from "react";

import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";

import "./NotificationListWrapper.scss";

interface NotificationListWrapperProps extends PropsWithChildren<ReactNode> {}

const NotificationListWrapper: React.FC<NotificationListWrapperProps> = ({
  children,
}) => {
  return <div className={"notification-list-wrapper"}>{children}</div>;
};

export default NotificationListWrapper;
