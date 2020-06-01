import React from "react";
import PropTypes from "prop-types";

import NavigationLink from "./NavigationLink/NavigationLink";

import "./NavigationLinks.scss";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const NavigationLinks = (props) => {
  const { userRole } = props;
  return (
    <nav className={"navigation-links"}>
      <ul className={"navigation-links__items"}>
        {userRole === "OWNER" && (
          <Aux>
            <NavigationLink link={"/storages"} text={"Storage"} />
            <NavigationLink link={"/employees"} text={"Employee"} />
          </Aux>
        )}
        {/* 
        <NavigationLink link={"/aaa"} text={"home3"} />
        <NavigationLink link={"/zzz"} text={"home4"} /> 
        */}
      </ul>
    </nav>
  );
};

NavigationLinks.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default NavigationLinks;
