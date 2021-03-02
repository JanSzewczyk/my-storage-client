import React from "react";
import { Link } from "react-router-dom";

import User from "../../shared/types/user/User";
import { UserRole } from "../../shared/constants";

import Button from "../UI/Inputs/Button/Button";
import NavigationLinks from "../Navigation/NavigationLinks/NavigationLinks";
import Logo from "./Logo/Logo";
import { LogOutIcon, UserIcon } from "../UI/DataDisplay/Icons";

import "./Header.scss";

interface HeaderProps {
  user: User | null;
  userRole: keyof typeof UserRole | null;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { userRole, user } = props;

  return (
    <header className={"header"}>
      <div className={"header__left"}>
        <Logo />

        <div className={"header__line"} />

        {userRole && <NavigationLinks userRole={userRole} />}
      </div>
      <div className={"header__right"}>
        {user && (
          <div className={"header__username"}>
            <UserIcon height={16} />
            {`${user.firstName} ${user.lastName}`}
          </div>
        )}
        <Link to={"/logout"}>
          <Button>
            <LogOutIcon />
            LOGOUT
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
