import React from "react";

import "../../../../index.scss";

import { boolean, withKnobs } from "@storybook/addon-knobs";

import Tree from "./Tree";
export default {
  title: "Navigation/Tree",
  component: Tree,
  componentSubtitle: "Tree component",
  decorators: [withKnobs],
};

export const Default = () => {
  return <Tree />;
};
