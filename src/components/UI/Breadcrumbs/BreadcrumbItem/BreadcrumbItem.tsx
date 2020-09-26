import React from "react";
import { Link } from "react-router-dom";

import "./BreadcrumbItem.scss";

interface BreadcrumbItemProps {
  text: string;
  path: string;
  active?: boolean;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  text,
  path,
  active,
}) => {
  let BIClasses = ["breadcrumb-item"];
  active && BIClasses.push("breadcrumb-item--active");

  return (
    <Link className={BIClasses.join(" ")} to={path}>
      {text}
    </Link>
  );
};

export default BreadcrumbItem;
