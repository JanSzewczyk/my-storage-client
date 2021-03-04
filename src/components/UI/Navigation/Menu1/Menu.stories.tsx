import React, { useState } from "react";

import { boolean, withKnobs } from "@storybook/addon-knobs";
import Menu from "./Menu";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import Button from "../../Inputs/Button";

export default {
  title: "Menu",
  component: Menu,
  componentSubtitle: "Menu and types",
  decorators: [withKnobs],
};

export const Default = () => {
  const [show, setShow] = useState<boolean>(true);
  return (
    <Aux>
      <div
        style={{
          width: "300px",
          position: "relative",
        }}
      >
        <Button onClick={() => setShow(!show)}>
          CLICK, position: relative
        </Button>
        <Menu visible={boolean("visible", true)}>sds</Menu>
      </div>
    </Aux>
  );
};
