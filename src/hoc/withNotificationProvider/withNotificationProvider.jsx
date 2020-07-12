import React, { useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import ee from "event-emitter";
import PropTypes from "prop-types";

import NotificationContext from "./notification-context";
import NotificationsWrapper from "@UI/Notification/NotificationsWrapper/NotificationsWrapper";
import Notification from "@UI/Notification/Notification/Notification";

const emitter = ee();

export const log = (msg) => {
  emitter.emit("log", msg);
};

export const success = (msg) => {
  emitter.emit("success", msg);
};

export const error = (msg) => {
  emitter.emit("error", msg);
};

const withNotificationProvider = (WrappedComponent) => {
  const WithNotificationProvider = (props) => {
    emitter.on("log", (msg) => {
      add(msg);
    });

    emitter.on("success", (msg) => {
      add(msg, "success");
    });

    emitter.on("error", (msg) => {
      add(msg, "error");
    });

    const [notifications, setNotifications] = useState([]);

    const add = useCallback(
      (content, type) => {
        const id = uuidv4();
        setNotifications([...notifications, { id, content, type }]);
      },
      [notifications]
    );

    const remove = useCallback(
      (id) => {
        setNotifications(notifications.filter((t) => t.id !== id));
      },
      [notifications]
    );

    const providerValue = useMemo(() => {
      return { add, remove };
    }, [add, remove]);

    return (
      <NotificationContext.Provider value={providerValue}>
        <WrappedComponent {...props} />
        {createPortal(
          <NotificationsWrapper>
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                type={notification.type}
                onRemove={() => remove(notification.id)}
              >
                {notification.content}
              </Notification>
            ))}
          </NotificationsWrapper>,
          document.body
        )}
      </NotificationContext.Provider>
    );
  };

  return WithNotificationProvider;
};

withNotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withNotificationProvider;
