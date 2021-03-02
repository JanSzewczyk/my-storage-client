import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

import Switch from "./Switch";

export default {
  title: "Inputs/Switch",
  component: Switch,
  componentSubtitle: "Switch",
  decorators: [withKnobs],
};

export const Default = () => {
  const [checked, setChecked] = React.useState(true);

  return (
    <Switch checked={checked} onChange={() => setChecked((prev) => !prev)} />
  );
};
