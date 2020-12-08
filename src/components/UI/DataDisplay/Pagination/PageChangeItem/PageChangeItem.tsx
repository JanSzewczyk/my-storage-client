import React from "react";

import PropsWithChildren from "../../../../../shared/types/props/PropsWithChildren";

import "./PageChangeItem.scss";

interface PageChangeItemProps extends PropsWithChildren {
  active: boolean;
  clicked?: () => void;
}

const PageChangeItem: React.FC<PageChangeItemProps> = ({
  children,
  active,
  clicked,
}) => {
  let pciClasses: string[] = ["page-change-item"];
  active && pciClasses.push("page-change-item--active");

  return (
    <div className={pciClasses.join(" ")} onClick={clicked && clicked}>
      {children}
    </div>
  );
};

export default PageChangeItem;
