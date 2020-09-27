import React from "react";

import PropsWithChildren from "../../../../../shared/types/props/PropsWithChildren";

import "./PaginationItem.scss";

interface PaginationItemProps extends PropsWithChildren {
  active: boolean;
  clicked: () => void;
}

const PaginationItem: React.FC<PaginationItemProps> = ({
  children,
  active,
  clicked,
}) => {
  const onClickHandler = () => !active && clicked();

  let paginationItemClasses: string[] = ["pagination-item"];
  active && paginationItemClasses.push("pagination-item--active");

  return (
    <li onClick={onClickHandler} className={paginationItemClasses.join(" ")}>
      {children}
    </li>
  );
};

export default PaginationItem;
