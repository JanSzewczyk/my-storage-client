import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./BreadcrumbItem.scss";

const BreadcrumbItem = ({ text, path, active }) => {
  let BIClasses = ["breadcrumb-item"];
  active && BIClasses.push("breadcrumb-item--active");

  return (
    <Link className={BIClasses.join(" ")} to={path}>
      {text}
    </Link>
  );
};

BreadcrumbItem.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default BreadcrumbItem;
