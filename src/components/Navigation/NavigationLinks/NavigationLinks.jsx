import React from "react";
import PropTypes from "prop-types";

import NavigationLink from "./NavigationLink/NavigationLink";

import "./NavigationLinks.scss";

const NavigationLinks = (props) => {
  const { userRole } = props;
  return (
    <nav className={"navigation-links"}>
      <ul className={"navigation-links__items"}>
        {userRole === "OWNER" && (
          <NavigationLink link={"/storages"} text={"Storages"} />
        )}
        <NavigationLink link={"/"} text={"home2"} exact />
        <NavigationLink link={"/aaa"} text={"home3"} />
        <NavigationLink link={"/zzz"} text={"home4"} />
      </ul>
    </nav>
  );
};

NavigationLinks.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default NavigationLinks;
