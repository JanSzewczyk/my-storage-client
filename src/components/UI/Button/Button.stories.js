import React from "react";
import { action } from "@storybook/addon-actions";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const Default = () => (
  <Button clicked={action("clicked")}>Default</Button>
);

export const Primary = () => (
  <Button clicked={action("clicked")} btnType={"primary"}>
    Primary
  </Button>
);

export const Warning = () => (
  <Button clicked={action("clicked")} btnType={"warning"}>
    Primary
  </Button>
);
