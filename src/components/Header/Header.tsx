import React from "react";
import { Link } from "react-router-dom";

import User from "../../shared/types/user/User";
import { UserRole } from "../../shared/constants";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InboxIcon from "@material-ui/icons/Inbox";
import PersonIcon from "@material-ui/icons/Person";
import Button from "../UI/Button/Button";
import NavigationLinks from "../Navigation/NavigationLinks/NavigationLinks";

import "./Header.scss";

interface HeaderProps {
  user: User | null;
  userRole: UserRole | null;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { userRole, user } = props;

  const logo = (
    <Link to={"/"} className={"header__logo"}>
      <InboxIcon />
      MY STORAGE
    </Link>
  );

  return (
    <header className={"header"}>
      <div className={"header__left"}>
        {logo}
        
        <div className={"header__line"} />

        {userRole && <NavigationLinks userRole={userRole} />}
      </div>
      <div className={"header__right"}>
        {user && (
          <div className={"header__username"}>
            <PersonIcon height={16} />
            {`${user.firstName} ${user.lastName}`}
          </div>
        )}
        <Link to={"/logout"}>
          <Button>
            <ExitToAppIcon />
            LOGOUT
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
