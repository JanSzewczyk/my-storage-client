import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InboxIcon from "@material-ui/icons/Inbox";
import PersonIcon from "@material-ui/icons/Person";
import Button from "../UI/Button/Button";
import NavigationLinks from "../Navigation/NavigationLinks/NavigationLinks";

import "./Header.scss";

const Header = (props) => {
  const { userRole, user, onLogout } = props;
  return (
    <header className={"header"}>
      <div className={"header__left"}>
        <Link to={"/"} className={"header__logo"}>
          <InboxIcon />
          MY STORAGE
        </Link>
        <div className={"header__line"} />
        <NavigationLinks userRole={userRole} />
      </div>
      <div className={"header__right"}>
        <div className={"header__username"}>
          <PersonIcon height={16} />
          {`${user.firstName} ${user.lastName}`}
        </div>
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
