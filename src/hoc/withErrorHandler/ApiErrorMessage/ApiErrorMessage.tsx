import React from "react";

import "./ApiErrorMessage.scss";

interface ApiErrorMessageProps {
  message?: string;
  url: string;
  status?: number;
  error?: string;
}

const ApiErrorMessage: React.FC<ApiErrorMessageProps> = ({
  message,
  url,
  status,
  error,
}) => {
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

export default ApiErrorMessage;
