import React from "react";

import { UserRole } from "../../../shared/constants";

import NavigationLink from "./NavigationLink/NavigationLink";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import "./NavigationLinks.scss";

interface NavigationLinksProps {
  userRole: UserRole | null;
}

const NavigationLinks: React.FC<NavigationLinksProps> = (props) => {
  const { userRole } = props;

  return (
    <nav className={"navigation-links"}>
      <ul className={"navigation-links__items"}>
        {userRole === UserRole.OWNER && (
          <Aux>
            <NavigationLink link={"/storages"} text={"Storage"} />
            <NavigationLink link={"/employees"} text={"Employee"} />
          </Aux>
        )}
      </ul>
    </nav>
  );
};

export default NavigationLinks;
