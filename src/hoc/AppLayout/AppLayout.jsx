import React from "react";
import PropTypes from "prop-types";

import Aux from "../Auxiliary/Auxiliary";

import "./AppLayout.scss";
import Header from "../../components/Header/Header";

const AppLayout = (props) => {
  const { children } = props;
  return (
    <Aux>
      <Header />
      <main className={"app-layout"}>
        <div className={"appbar"}>elo</div>
        <div className={"appbody"}>
          <div className={"appcontent"}> {children}</div>
        </div>
      </main>
    </Aux>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

export default AppLayout;
