import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./Notification.scss";

const Notification = ({ children, type, duration, onRemove }) => {
  const removeRef = useRef();
  removeRef.current = onRemove;

  let notificationStyles = ["notification"];
  type && notificationStyles.push(`notification--${type}`);

  useEffect(() => {
    let id = null;
    
    if (duration) {
      id = setTimeout(() => removeRef.current(), duration);
    }

    return () => duration && id && clearTimeout(id);
  }, [duration]);

  return (
    <div className={notificationStyles.join(" ")} onClick={onRemove}>
      <div className="notification__text">{children}</div>
    </div>
  );
};

Notification.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["info", "success", "error"]),
  onRemove: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

Notification.defaultValues = {
  type: "info",
  duration: 10 * 1000,
};

export default Notification;
