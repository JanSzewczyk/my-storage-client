export const NOTIFICATION_ADD = "NOTIFICATION_ADD";
export const NOTIFICATION_REMOVE = "NOTIFICATION_REMOVE";

export const initialState = {
  notifications: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_ADD:
      return {
        notifications: [...state.notifications, action.newNotification],
      };
    case NOTIFICATION_REMOVE:
      return {
        notifications: state.notifications.filter(
          (t) => t.id !== action.id
        ),
      };
    default:
      return initialState;
  }
};
