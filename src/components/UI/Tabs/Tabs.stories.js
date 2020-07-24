import React from "react";

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
