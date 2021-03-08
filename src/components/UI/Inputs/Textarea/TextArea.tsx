import React, {
  ChangeEventHandler,
  CSSProperties,
  forwardRef,
  useRef,
  KeyboardEvent,
} from "react";

import "./TextArea.scss";
import useMergedRef from "../../../../hooks/useMergedRef";

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

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const multiRef = useMergedRef(ref, textareaRef);

    const eventOnKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();

        const value = textareaRef.current!.value;
        const selectionStart = textareaRef.current!.selectionStart;
        const selectionEnd = textareaRef.current!.selectionEnd;

        textareaRef.current!.value =
          value.substring(0, selectionStart) +
          "\t" +
          value.substring(selectionEnd);
        console.log(value, selectionStart, selectionEnd);
      }
    };

    return (
      <textarea
        ref={multiRef}
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
