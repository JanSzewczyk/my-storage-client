import { create } from "@storybook/theming/create";

export default create({
  base: "dark",

  colorPrimary: "#dc2d37",
  colorSecondary: "#0082f0",

  // UI
  appBg: "#181818",
  appContentBg: "#242424",
  appBorderColor: "#3ea6ff",
  appBorderRadius: 4,

  // Typography
  fontBase: '"Lato", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "#f2f2f2",
  textInverseColor: "rgba(255,255,255,0.9)",

  // Toolbar default and active colors
  barTextColor: "silver",
  barSelectedColor: "#f4f4f4",
  barBg: "#333333",

  // Form colors
  inputBg: "white",
  inputBorder: "silver",
  inputTextColor: "#f2f2f2",
  inputBorderRadius: 4,

  brandTitle: "My Storage UI Storybook",
  //   brandUrl: "https://example.com",
  //   brandImage: "https://placehold.it/350x150",
});
