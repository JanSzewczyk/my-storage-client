import React from "react";
import PropTypes from "prop-types";

import Aux from "../Auxiliary/Auxiliary";

import "./AppLayout.scss";
import Header from "../../components/Header/Header";
import AppBar from "../../components/UI/AppBar/AppBar";
import AppContent from "../../components/UI/AppContent/AppContent";

const AppLayout = (props) => {
  const { children } = props;
  return (
    <Aux>
      <Header />
      <main className={"app-layout"}>
        {/* <AppBar /> */}
        <AppContent>{children}</AppContent>
      </main>
    </Aux>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
