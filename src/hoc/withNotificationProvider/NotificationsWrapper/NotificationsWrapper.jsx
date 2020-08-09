import React from "react";
import PropTypes from "prop-types";

import "./NotificationsWrapper.scss";

const NotificationsWrapper = (props) => {
  const { children } = props;
  return <div className={"notifications-wrapper"}>{children}</div>;
};

NotificationsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationsWrapper;
