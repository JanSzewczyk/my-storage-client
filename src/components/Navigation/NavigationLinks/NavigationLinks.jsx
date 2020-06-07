import React from "react";
import PropTypes from "prop-types";

import NavigationLink from "./NavigationLink/NavigationLink";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import "./NavigationLinks.scss";

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
      </ul>
    </nav>
  );
};

NavigationLinks.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default NavigationLinks;
