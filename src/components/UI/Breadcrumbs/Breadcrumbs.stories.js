import React from "react";
import { Router } from "react-router-dom";

import Breadcrumbs, { BreadcrumbItem } from "./";

export default {
  title: "Breadcrumbs",
  component: Breadcrumbs,
  //   componentSubtitle: "Buttons and types",
  //   excludeStories: /.*Data$/,
  //   decorators: [withKnobs],
};

export const Default = () => (
  <Router>
    <Breadcrumbs>
      <BreadcrumbItem text={"bread 1"} path={"/dsf"} />
      <BreadcrumbItem text={"bread 2"} path={"/dsf/sdf"} />
    </Breadcrumbs>
  </Router>
);
