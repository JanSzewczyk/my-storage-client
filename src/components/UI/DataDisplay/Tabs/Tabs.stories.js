import React from "react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import Tabs, { Tab } from "./";

export default {
  title: "Tabs",
  component: Tabs,
  componentSubtitle: "Buttons and types",
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
};

export const Default = () => (
  <Tabs>
    <Tab title={text("title", "Title 1")} disabled={boolean("disabled", false)}>
      {text("tab content", "CONTENT 1")}
    </Tab>
    <Tab title={"Title 2"}>CONTENT 2</Tab>
    <Tab title={"Title 3"}>CONTENT 3</Tab>
    <Tab title={"Title 4"}>CONTENT 4</Tab>
  </Tabs>
);

export const FirstDisabled = () => (
  <Tabs>
    <Tab title={"Title 1"} disabled>
      CONTENT 1
    </Tab>
    <Tab title={"Title 2"}>CONTENT 2</Tab>
    <Tab title={"Title 3"}>CONTENT 3</Tab>
    <Tab title={"Title 4"}>CONTENT 4</Tab>
  </Tabs>
);

export const AllDisabled = () => (
  <Tabs>
    <Tab title={"Title 1"} disabled>
      CONTENT 1
    </Tab>
    <Tab title={"Title 2"} disabled>
      CONTENT 2
    </Tab>
    <Tab title={"Title 3"} disabled>
      CONTENT 3
    </Tab>
    <Tab title={"Title 4"} disabled>
      CONTENT 4
    </Tab>
  </Tabs>
);
