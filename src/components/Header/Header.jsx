import React from "react";

import "./Header.scss";
import Button from "../UI/Button/Button";
import NavigationLinks from "../Navigation/NavigationLinks/NavigationLinks";

const Header = () => (
  <header className={"header"}>
    <div className={"header__left"}>
      <div className={"header__logo"}>Inbox MY STORAGE</div>
      <div className={"header__line "} />
      <NavigationLinks />
    </div>
    <div className={"header__right"}>
      <div className={"header__username"}>Jan Szewczyk</div>
      <Button>LOGOUT</Button>
    </div>
  </header>
);

Header.propTypes = {};

export default Header;
