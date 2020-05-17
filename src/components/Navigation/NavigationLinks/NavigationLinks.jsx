import React from "react";

import "./NavigationLinks.scss";
import NavigationLink from "./NavigationLink/NavigationLink";

const NavigationLinks = () => {
  return (
    <nav className={"navigation-links"}>
      <ul className={"navigation-links__items"}>
        <NavigationLink link={"/elo"} text={"home1"} />
        <NavigationLink link={"/fgdf"} text={"home2"} />
        <NavigationLink link={"/aaa"} text={"home3"} />
        <NavigationLink link={"/zzz"} text={"home4"} />
      </ul>
    </nav>
  );
};

export default NavigationLinks;
