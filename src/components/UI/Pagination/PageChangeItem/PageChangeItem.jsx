import React from "react";
import PropTypes from "prop-types";

import "./PageChangeItem.scss";

const PageChangeItem = (props) => {
  const { children, active, clicked } = props;

  let pciClasses = ["page-change-item"];
  active && pciClasses.push("page-change-item--active");

  const onClickHandler = () => active && clicked();

  return (
    <div className={pciClasses.join(" ")} onClick={onClickHandler}>
      {children}
    </div>
  );
};

PageChangeItem.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default PageChangeItem;
