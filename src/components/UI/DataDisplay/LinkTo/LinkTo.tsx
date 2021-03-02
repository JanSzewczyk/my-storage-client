import React, { forwardRef, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface LinkToProps {
  to: string;
}

type RefType = HTMLAnchorElement;

const LinkTo = forwardRef<RefType, PropsWithChildren<LinkToProps>>(
  ({ to, children }, ref) => {
    return (
      <Link to={to} ref={ref}>
        {children}
      </Link>
    );
  }
);
