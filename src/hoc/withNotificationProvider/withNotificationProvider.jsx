import React, { useMemo, useCallback, useReducer } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import ee from "event-emitter";
import PropTypes from "prop-types";

import NotificationsWrapper from "./NotificationsWrapper/NotificationsWrapper";
import Notification from "../../components/UI/Notification/Notification";

import {
  reducer,
  initialState,
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE,
  NotificationContext,
} from "./";

const emitter = ee();

export const log = (msg) => {
  emitter.emit("info", msg);
};

export const success = (msg) => {
  emitter.emit("success", msg);
};

export const error = (msg) => {
  emitter.emit("error", msg);
};

const withNotificationProvider = (Component) => {
  const WithNotificationProvider = (props) => {
    emitter.on("info", (msg) => {
      add(msg);
    });

    emitter.on("success", (msg) => {
      add(msg, "success");
    });

    emitter.on("error", (msg) => {
      add(msg, "error");
    });

    const [state, dispatch] = useReducer(reducer, initialState);

    const add = useCallback((content, type = "info", duration = 10000) => {
      const id = uuidv4();

      dispatch({
        type: NOTIFICATION_ADD,
        newNotification: { id, content, type, duration },
      });
    }, []);

    const remove = useCallback((id) => {
      dispatch({
        type: NOTIFICATION_REMOVE,
        id: id,
      });
    }, []);

    const providerValue = useMemo(() => {
      return { add, remove };
    }, [add, remove]);

    return (
      <NotificationContext.Provider value={providerValue}>
        <Component {...props} />
        {createPortal(
          <NotificationsWrapper>
            {state.notifications.map((notification) => (
              <Notification
                key={notification.id}
                type={notification.type}
                duration={notification.duration}
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
