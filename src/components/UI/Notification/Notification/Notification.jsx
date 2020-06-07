import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./Notification.scss";

const Notification = (props) => {
  const { children, type, onRemove } = props;

  const removeRef = useRef();
  removeRef.current = onRemove;

  let notificationStyles = ["notification"];
  type && notificationStyles.push(`notification--${type}`);

  useEffect(() => {
    const duration = 5000;
    const id = setTimeout(() => removeRef.current(), duration);

    return () => clearTimeout(id);
  }, []);

  return (
    <div className={notificationStyles.join(" ")} onClick={onRemove}>
      <div className="notification__text">{children}</div>
    </div>
  );
};

Notification.propTypes = {
  children: PropTypes.any,
  type: PropTypes.oneOf(["success", "error", undefined]),
  onRemove: PropTypes.func.isRequired,
};

export default Notification;
