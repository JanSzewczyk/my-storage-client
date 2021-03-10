import React, { useState } from "react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import TextArea from "./TextArea";

export default {
  title: "Inputs/TextArea",
  component: TextArea,
  componentSubtitle: "TextArea",
  decorators: [withKnobs],
};

export const Default = () => {
  const [state, setState] = useState<string>("");

  return (
    <div>
      <TextArea
        name={"textarea"}
        value={state}
        defaultValue={text("defaultValue", "")}
        autoFocus={boolean("autoFocus", true)}
        readOnly={boolean("readOnly", false)}
        disabled={boolean("disabled", false)}
        onChange={(e) => {
          action("onChange");
          setState(e.target.value);
        }}
        fullWidth={boolean("fullWidth", false)}
      />
      <pre>{state}</pre>
    </div>
  );
};
