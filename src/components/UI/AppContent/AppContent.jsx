import React from "react";
import PropTypes from "prop-types";

import "./AppContent.scss";

// TODO flex wrap options / column

const AppContent = (props) => {
  const { children } = props;
  return (
    <div className={"app-content"}>
      {/* <div className={"app-content__container"}> */}
      {children}
      {/* </div> */}
    </div>
  );
};

AppContent.propTypes = {
  children: PropTypes.node,
};

export default AppContent;
