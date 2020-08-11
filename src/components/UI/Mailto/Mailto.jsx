import React from "react";
import PropTypes from "prop-types";

import "./Mailto.scss";

const Mailto = ({ email, children, headers }) => {
  const toSearchString = (searchParams) => {
    return Object.keys(searchParams)
      .map((key) => `${key}=${encodeURIComponent(searchParams[key])}`)
      .join("&");
  };

  const createMailtoLink = (email, headers) => {
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

Mailto.propTypes = {
  children: PropTypes.node.isRequired,
  email: PropTypes.string.isRequired,
  headers: PropTypes.exact({
    cc: PropTypes.string,
    bcc: PropTypes.string,
    subject: PropTypes.string,
    body: PropTypes.string,
  }),
};

export default Mailto;
