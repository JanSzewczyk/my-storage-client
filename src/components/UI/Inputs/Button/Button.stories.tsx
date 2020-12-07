import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import Button from "./Button";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import IconButton from "../IconButton";
import { EditIcon } from "../../DataDisplay/Icons";

export default {
  title: "Button",
  component: Button,
  componentSubtitle: "Buttons and types",
  decorators: [withKnobs],
};

export const Default = () => (
  <Aux>
    <Button onClick={action("onClick")} disabled={boolean("disabled", false)}>
      {text("text", "Default")}
    </Button>
    <Button onClick={action("onClick")} disabled>
      Disable Default
    </Button>
  </Aux>
);

export const Primary = () => (
  <Aux>
    <Button
      onClick={action("onClick")}
      color={"primary"}
      disabled={boolean("disabled", false)}
    >
      {text("text", "Primary")}
    </Button>
    <Button onClick={action("onClick")} color={"primary"} disabled>
      Disable Primary
    </Button>
  </Aux>
);

export const Warning = () => (
  <Aux>
    <Button
      onClick={action("onClick")}
      color={"warning"}
      disabled={boolean("disabled", false)}
    >
      {text("text", "Warning")}
    </Button>
    <Button onClick={action("onClick")} color={"warning"} disabled>
      Disable Warning
    </Button>
  </Aux>
);

export const Icon = () => (
  <Aux>
    <IconButton>
      <EditIcon />
    </IconButton>
  </Aux>
);
