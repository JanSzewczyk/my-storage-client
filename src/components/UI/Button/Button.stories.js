import React from "react";
import { action } from "@storybook/addon-actions";

import Button from "./Button";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

export default {
  title: "Button",
  component: Button,
  componentSubtitle: "Buttons and types",
};

export const Default = () => (
  <Aux>
    <Button clicked={action("clicked")}>Default</Button>
    <Button clicked={action("clicked")} disabled>
      Disable Default
    </Button>
  </Aux>
);

export const Primary = () => (
  <Aux>
    <Button clicked={action("clicked")} btnType={"primary"}>
      Primary
    </Button>
    <Button clicked={action("clicked")} btnType={"primary"} disabled>
      Disable Primary
    </Button>
  </Aux>
);

export const Warning = () => (
  <Aux>
    <Button clicked={action("clicked")} btnType={"warning"}>
      Warning
    </Button>
    <Button clicked={action("clicked")} btnType={"warning"} disabled>
      Disable Warning
    </Button>
  </Aux>
);
