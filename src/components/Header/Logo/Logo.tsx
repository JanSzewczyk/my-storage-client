import React from "react";
import { Link } from "react-router-dom";
import { FaBox } from "react-icons/fa";

import "./Logo.scss";

const Logo: React.FC = () => {
  return (
    <Link to={"/"} className={"logo"}>
      <FaBox />
      <span>MY STORAGE</span>
    </Link>
  );
};

export default Logo;
