import React from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/Auxiliary/Auxiliary";

import "./Breadcrumbs.scss";

const Breadcrumbs = ({ children }) => {
  return (
    <div className={"breadcrumbs"}>
      {children.map((child, index) => (
        <Aux key={index}>
          {child}
          {children.length > index + 1 && <span>&#47;</span>}
        </Aux>
      ))}
    </div>
  );
};

Breadcrumbs.propTypes = {
  children: PropTypes.node,
};

export default Breadcrumbs;
