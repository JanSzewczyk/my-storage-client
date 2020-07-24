import React from "react";

import { action } from "@storybook/addon-actions";

import Tabs, { Tab } from "./";

export default {
  title: "Tabs",
  component: Tabs,
  componentSubtitle: "Buttons and types",
};

export const Default = () => (
  <Tabs>
    <Tab title={"Title 1"}>CONTENT 1</Tab>
    <Tab title={"Title 2"}>CONTENT 2</Tab>
    <Tab title={"Title 3"}>CONTENT 3</Tab>
    <Tab title={"Title 4"} disabled>
      CONTENT 4
    </Tab>
  </Tabs>
);
