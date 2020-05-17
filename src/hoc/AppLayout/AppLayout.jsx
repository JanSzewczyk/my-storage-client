import React from "react";
import PropTypes from "prop-types";

import Aux from "../Auxiliary/Auxiliary";
import Header from "../../components/Header/Header";

import "./AppLayout.scss";

const AppLayout = (props) => {
  const { children } = props;
  return (
    <Aux>
      <Header />
      <main className={"app-layout"}>{children}</main>
    </Aux>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
