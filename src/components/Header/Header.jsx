import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Button from "../UI/Button/Button";
import NavigationLinks from "../Navigation/NavigationLinks/NavigationLinks";

import "./Header.scss";

const Header = (props) => {
  const { userRole, user, onLogout } = props;
  return (
    <header className={"header"}>
      <div className={"header__left"}>
        {/* <div className={"header__logo"}> */}
        <Link to={"/"} className={"header__logo"}>
          Inbox MY STORAGE
        </Link>
        {/* </div> */}
        <div className={"header__line "} />
        <NavigationLinks userRole={userRole} />
      </div>
      <div className={"header__right"}>
        <div
          className={"header__username"}
        >{`${user.firstName} ${user.lastName}`}</div>
        <Button clicked={onLogout}>LOGOUT</Button>
      </div>
    </header>
  );
};

Header.propTypes = {
  userRole: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
