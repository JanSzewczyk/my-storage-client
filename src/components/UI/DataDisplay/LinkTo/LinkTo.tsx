import React, { forwardRef, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import "./LinkTo.scss";

interface LinkToProps {
  to: string;
  className?: string;
  notLink?: boolean;
}

type RefType = HTMLAnchorElement;

const LinkTo = forwardRef<RefType, PropsWithChildren<LinkToProps>>(
  ({ to, children, className, notLink }, ref) => {
    let linkToClasses: string[] = ["link-to"];
    if (notLink) linkToClasses.push("link-to__not-link");
    if (className) linkToClasses.push(className);

    return (
      <Link className={linkToClasses.join(" ")} to={to} ref={ref}>
        {children}
      </Link>
    );
  }
);

export default LinkTo;
