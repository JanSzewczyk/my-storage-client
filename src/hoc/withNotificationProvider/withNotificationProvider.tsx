import React, { useMemo, useCallback, useReducer } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";

import {
  initialState,
  reducer,
} from "./notification-store/notification.reducer";
import {
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE,
} from "./notification-store/notificationActionTypes";

import NotificationListWrapper from "./NotificationListWrapper/NotificationListWrapper";
import NotificationWrapper from "../../components/UI/NotificationWrapper/NotificationWrapper";
import NotificationContext from "./notification-context/notification-context";
import { AddNotification, NotificationContextValue, NotificationInfo } from "./types";

const withNotificationProvider = <T extends object>(
  Component: React.ComponentType<T>
) => {
  const WithNotificationProvider = (props: T) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const add = useCallback(
      ({ content, type = "info", duration = 10000 }: AddNotification) => {
        const id = uuidv4();

        dispatch({
          type: NOTIFICATION_ADD,
          newNotification: {
            id,
            content,
            type,
            duration,
            timestamp: new Date(),
          },
        });
      },
      []
    );

    const remove = useCallback((id) => {
      dispatch({
        type: NOTIFICATION_REMOVE,
        id: id,
      });
    }, []);

    const providerValue: NotificationContextValue = useMemo(() => {
      return { add, remove };
    }, [add, remove]);

    return (
      <NotificationContext.Provider value={providerValue}>
        <Component {...props} />
        {createPortal(
          <NotificationListWrapper>
            {state.notifications.map((notification: NotificationInfo) => (
              <NotificationWrapper
                key={notification.id}
                type={notification.type}
                duration={notification.duration}
                timestamp={notification.timestamp}
                onRemove={() => remove(notification.id)}
              >
                {notification.content}
              </NotificationWrapper>
            ))}
          </NotificationListWrapper>,
          document.body
        )}
      </NotificationContext.Provider>
    );
  };

  return WithNotificationProvider;
};

export default withNotificationProvider;
