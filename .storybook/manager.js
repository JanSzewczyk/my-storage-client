import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming";
import darkTheme from "./darkTheme";

addons.setConfig({
  theme: darkTheme,
});
