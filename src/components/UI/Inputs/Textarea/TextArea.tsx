import React, { ChangeEventHandler, CSSProperties, forwardRef } from "react";

import "./TextArea.scss";

type RefType = HTMLTextAreaElement;

interface TextAreaProps {
  //  config
  id?: string;
  name: string;
  placeholder?: string;
  value?: string | number | ReadonlyArray<string>;
  defaultValue?: string | number | ReadonlyArray<string>;
  autoFocus?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  maxLength?: number;

  //  actions
  onChange?: ChangeEventHandler<RefType>;

  //  styles
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
}

const TextArea = forwardRef<RefType, TextAreaProps>(
  (
    {
      id,
      name,
      placeholder,
      value,
      defaultValue,
      autoFocus,
      readOnly,
      disabled,
      maxLength,
      onChange,
      fullWidth,
      className,
      style,
    },
    ref
  ) => {
    let textAreaClasses: string[] = ["textarea"];
    if (fullWidth) textAreaClasses.push("textarea--fullwidth");
    if (className) textAreaClasses.push(className);

    if (!id) id = name;

    const eventOnKeyDown = (e: any): void => {
      if (e.key === "Tab" && !e.shiftKey) {
        // e.preventDefault();

        console.log(e.currentTarget.value);
      }
    };

    console.log(ref);

    return (
      <textarea
        ref={ref}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        readOnly={readOnly}
        disabled={disabled}
        maxLength={maxLength}
        onChange={onChange}
        onKeyDown={eventOnKeyDown}
        className={textAreaClasses.join(" ")}
        style={style}
      />
    );
  }
);

export default TextArea;
