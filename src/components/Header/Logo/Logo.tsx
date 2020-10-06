import React from "react";
import { Link } from "react-router-dom";
import { BoxIcon } from "../../UI/Icons";

import "./Logo.scss";

const Logo: React.FC = () => {
  return (
    <Link to={"/"} className={"logo"}>
      <BoxIcon />
      <span>MY STORAGE</span>
    </Link>
  );
};

export default Logo;
