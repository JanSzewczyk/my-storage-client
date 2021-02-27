import React, { CSSProperties, PropsWithChildren } from "react";

import "./ValidationError.scss";

interface ValidationErrorProps {
  isError?: boolean;
  style?: CSSProperties;
  className?: string;
}

const ValidationError: React.FC<PropsWithChildren<ValidationErrorProps>> = ({
  isError,
  children,
  style,
  className,
}) => {
  let validationErrorClasses: string[] = ["validation-error"];
  if (isError) validationErrorClasses.push("validation-error--active");
  if (className) validationErrorClasses.push(className);

  return (
    <div className={validationErrorClasses.join(" ")} style={style}>
      {children}
    </div>
  );
};

export default ValidationError;
