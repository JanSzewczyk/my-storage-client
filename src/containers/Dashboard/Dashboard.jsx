import React from "react";

import { connect } from "react-redux";
import * as action from "../../store";

import AppBar from "../../components/UI/AppBar/AppBar";
import AppContent from "../../components/UI/AppContent/AppContent";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Tile from "../../components/UI/Tile/Tile";

const Dashboard = (props) => {
  return (
    <Aux>
      <AppBar />
      <AppContent>
        <Tile
          tileSize={{
            sm: "sm-12",
            md: "md-6",
            lg: "lg-4",
            xl: "xl-3",
          }}
          top={{}}
        >
          HOMEPAGE
        </Tile>
      </AppContent>
    </Aux>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (authData) => dispatch(action.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
