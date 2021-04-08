import React from "react";
import "../src/index.scss";
import { addDecorator } from "@storybook/react";

const styles = {
  margin: "8px",
  display: "flex",
  wight: "100%"
  // justifyContent: "center",
};

addDecorator((storyFn) => <div style={styles}>{storyFn()}</div>);
