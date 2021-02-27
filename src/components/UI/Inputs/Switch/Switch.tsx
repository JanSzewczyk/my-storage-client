import React, { forwardRef } from "react";

import "./Switch.scss";

interface SwitchProps {
  checked?: boolean;
  onChange?: () => void;
}

type RefType = HTMLInputElement;

const Switch = forwardRef<RefType, SwitchProps>(
  ({ checked, onChange }, ref) => {
    return (
      <div className={"switch"}>
        <input
          type={"checkbox"}
          checked={checked}
          //   disabled
          onChange={onChange}
          ref={ref}
          autoFocus
        />
        <div className={"ball"} onClick={onChange} />
        <span>ASDADSS</span>
      </div>
    );
  }
);

export default Switch;
