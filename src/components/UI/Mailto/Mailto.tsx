import React, { ReactNode } from "react";

import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";
import { MailtoHeaders } from "./types";

import "./Mailto.scss";
import { FixMeLater } from "../../../shared/types/common/FixMeLater";

interface MailtoProps extends PropsWithChildren<ReactNode> {
  email: string;
  headers?: MailtoHeaders;
}

const Mailto: React.FC<MailtoProps> = ({ email, children, headers }) => {
  const toSearchString = (searchParams: FixMeLater): string => {
    return Object.keys(searchParams)
      .map((key: string) => `${key}=${encodeURIComponent(searchParams[key])}`)
      .join("&");
  };

  const createMailtoLink = (email: string, headers?: MailtoHeaders): string => {
    let link = `mailto:${email}`;

    if (headers) {
      link += `?${toSearchString(headers)}`;
    }

    return link;
  };

  return (
    <a className={"mailto"} href={createMailtoLink(email, headers)}>
      {children}
    </a>
  );
};

export default Mailto;
