import React from "react";
import { boolean, text, withKnobs, select } from "@storybook/addon-knobs";

import Input from "./Input";
import Label from "../Label/Label";
import ValidationError from "../ValidationError";

export default {
  title: "Inputs/Input",
  component: Input,
  componentSubtitle: "Input and types",
  decorators: [withKnobs],
};

export const Default = () => (
  <Input
    name="test"
    type={select(
      "type",
      {
        date: "date",
        "datetime-local": "datetime-local",
        email: "email",
        number: "number",
        password: "password",
        tel: "tel",
        text: "text",
        search: "search",
        url: "url",
      },
      "text"
    )}
    fullWidth={boolean("fullWidth", false)}
    value={text("value", "")}
    placeholder={text("placeholder", "")}
    prefix={text("prefix", "")}
    suffix={text("suffix", "")}
    iconInside={text("iconInside", "")}
  />
);

export const InputWithLabel = () => (
  <div
    style={{
      width: "100%",
    }}
  >
    <Label name="test">{text("label content", "Input Label")}</Label>
    <Input
      name="test"
      type={select(
        "type",
        {
          date: "date",
          "datetime-local": "datetime-local",
          email: "email",
          number: "number",
          password: "password",
          tel: "tel",
          text: "text",
          search: "search",
          url: "url",
        },
        "text"
      )}
      fullWidth={boolean("input fullWidth", false)}
      value={text("input value", "")}
      placeholder={text("input placeholder", "")}
      prefix={text("input prefix", "")}
      suffix={text("input suffix", "")}
      iconInside={text("input icon inside", "")}
    />
  </div>
);

export const InputWithLabelAndErrorMessage = () => (
  <div
    style={{
      width: "100%",
    }}
  >
    <Label name="test">{text("label content", "Input Label")}</Label>
    <Input
      name="test"
      type={select(
        "type",
        {
          date: "date",
          "datetime-local": "datetime-local",
          email: "email",
          number: "number",
          password: "password",
          tel: "tel",
          text: "text",
          search: "search",
          url: "url",
        },
        "text"
      )}
      fullWidth={boolean("input fullWidth", false)}
      value={text("input value", "")}
      placeholder={text("input placeholder", "")}
      prefix={text("input prefix", "")}
      suffix={text("input suffix", "")}
      iconInside={text("input icon inside", "")}
      required
    />
    <ValidationError hasError={boolean("is error", false)}>
      {text("error content", "Error information")}
    </ValidationError>
  </div>
);
