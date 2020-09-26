import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationLink.scss";

interface NavigationLinkProps {
  text: string;
  link: string;
  exact?: boolean;
}

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
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

export default NavigationLink;
