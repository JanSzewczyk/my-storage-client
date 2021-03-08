import React, { CSSProperties, PropsWithChildren } from "react";

import "./Row.scss";

interface RowProps {
  className?: string;
  style?: CSSProperties;
}

const AppContent: React.FC<PropsWithChildren<RowProps>> = ({
  children,
  className,
  style,
}) => {
  let rowClasses: string[] = ["row"];
  if (className) rowClasses.push(className);

  return (
    <div className={rowClasses.join(" ")} style={style}>
      {children}
    </div>
  );
};

export default AppContent;
