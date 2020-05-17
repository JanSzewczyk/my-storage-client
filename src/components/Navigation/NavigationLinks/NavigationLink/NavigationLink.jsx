import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import "./NavigationLink.scss";

const NavigationLink = (props) => {
  const { text, link, exact } = props;
  return (
    <li className="navigation-link">
      <NavLink
        to={link}
        exact={exact}
        activeClassName={"navigation-link__nav-link--active"}
        className={"navigation-link__nav-link"}
      >
        {text}
      </NavLink>
    </li>
  );
};

NavigationLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

export default NavigationLink;
