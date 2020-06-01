import React from "react";
import PropTypes from "prop-types";

import "./PaginationItem.scss";

const PaginationItem = (props) => {
  const { children, active, clicked } = props;

  const onClickHandler = () => !active && clicked();

  let piClasses = ["pagination-item"];
  active && piClasses.push("pagination-item--active");

  return (
    <li onClick={onClickHandler} className={piClasses.join(" ")}>
      {children}
    </li>
  );
};

PaginationItem.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default PaginationItem;
