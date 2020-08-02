import React, { useMemo, useCallback, useReducer } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";

import NotificationsWrapper from "./NotificationsWrapper/NotificationsWrapper";
import Notification from "../../components/UI/Notification/Notification";

import {
  reducer,
  initialState,
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE,
  NotificationContext,
} from "./";

const withNotificationProvider = (Component) => {
  const WithNotificationProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const add = useCallback((content, type = "info", duration = 10000) => {
      const id = uuidv4();

      console.log("elo ", { id, content, type, duration });

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

export default withNotificationProvider;
