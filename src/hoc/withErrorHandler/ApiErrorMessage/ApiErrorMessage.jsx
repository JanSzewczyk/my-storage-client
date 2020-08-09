import React from "react";
import PropTypes from "prop-types";

import "./ApiErrorMessage.scss";

const ApiErrorMessage = ({ message, url, status, error }) => {
  return (
    <div className={"api-error-message"}>
      <span className={"api-error-message__url"}>{url}</span>
      {message && (
        <span className={"api-error-message__message"}>{message}</span>
      )}
      {status && (
        <span className={"api-error-message__status"}>Status {status}</span>
      )}
      {error && <span className={"api-error-message__error"}>{error}</span>}
    </div>
  );
};

ApiErrorMessage.propTypes = {
  url: PropTypes.string.isRequired,
  message: PropTypes.string,
  status: PropTypes.number,
  error: PropTypes.string,
};

export default ApiErrorMessage;
