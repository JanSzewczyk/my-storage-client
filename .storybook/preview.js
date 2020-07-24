import React from "react";

import { addDecorator } from "@storybook/react";

const styles = {
  margin: "8px",
  display: "flex",
};

addDecorator((storyFn) => <div style={styles}>{storyFn()}</div>);
