import React from "react";

import Tooltip from "./";
import Button from "../Button";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const styles = {
  marginTop: "38px",
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
};

export default {
  title: "Tooltip",
  component: Tooltip,
  componentSubtitle: "Tooltip",
  excludeStories: /.*Data$/,
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
};

export const Default = () => (
  <Aux>
    <Tooltip text={"Tooltip text"}>
      <Button>Tooltip</Button>
    </Tooltip>
  </Aux>
);

export const TooltipPositions = () => (
  <Aux>
    <Tooltip text={"Tooltip Top text"} position={"top"}>
      <Button>Tooltip Top</Button>
    </Tooltip>
    <Tooltip text={"Tooltip Top End text"} position={"top-end"}>
      <Button>Tooltip Top End</Button>
    </Tooltip>
    <Tooltip text={"Tooltip Bottom text"} position={"bottom"}>
      <Button>Tooltip Bottom</Button>
    </Tooltip>
    <Tooltip text={"Tooltip Bottom End text"} position={"bottom-end"}>
      <Button>Tooltip Bottom End</Button>
    </Tooltip>
    <Tooltip text={"Tooltip Right text"} position={"right"}>
      <Button>Tooltip Right</Button>
    </Tooltip>
    <Tooltip text={"Tooltip Left text"} position={"left"}>
      <Button>Tooltip Left</Button>
    </Tooltip>
  </Aux>
);

export const TooltipColors = () => (
  <Aux>
    <Tooltip text={"Tooltip White text"}>
      <Button>Tooltip White</Button>
    </Tooltip>
    <Tooltip text={"Tooltip Blue text"} color={"blue"}>
      <Button>Tooltip Blue</Button>
    </Tooltip>
    <Tooltip text={"Tooltip Black text"} color={"black"}>
      <Button>Tooltip Black</Button>
    </Tooltip>
  </Aux>
);

export const DottedTooltip = () => (
  <span style={{ color: "#f2f2f2" }}>
    <Tooltip text={"Tooltip text"} type={"dotted"}>
      Lorem Ipsum
    </Tooltip>{" "}
    is simply dummy text of the printing and typesetting industry. Lorem Ipsum
    has been the industry's standard dummy
  </span>
);
