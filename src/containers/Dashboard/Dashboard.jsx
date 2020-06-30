import React from "react";

import { connect } from "react-redux";
import * as action from "../../store";

import AppBar from "../../components/UI/AppBar/AppBar";
import AppContent from "../../components/UI/AppContent/AppContent";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Tile from "../../components/UI/Tile/Tile";
import DropDown from "../../components/UI/DropDown/DropDown";
import DropdownItem from "../../components/UI/DropDown/DropdownItem/DropdownItem";
import EllipsisWrapper from "../../components/UI/EllipsisWrapper/EllipsisWrapper";
import Tooltip from "../../components/UI/Tooltip/Tooltip";

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
            xl: "xl-9",
          }}
        >
          HOMEPAGE
          <div
            style={{
              display: "flex",
            }}
          >
            <DropDown title={"dropdown"} top left></DropDown>
          </div>
        </Tile>
        <Tile
          tileSize={{
            sm: "sm-12",
            md: "md-6",
            lg: "lg-4",
            xl: "xl-9",
          }}
        >
          HOMEPAGE
          <div
            style={{
              display: "flex",
            }}
          >
            <DropDown btnType={"primary"} title={"dropdown"} left></DropDown>
          </div>
        </Tile>
        <Tile
          tileSize={{
            sm: "sm-12",
            md: "md-6",
            lg: "lg-4",
            xl: "xl-9",
          }}
        >
          HOMEPAGE
          <div
            style={{
              display: "flex",
            }}
          >
            <DropDown btnType={"warning"} title={"dropdown"}>
              <DropdownItem onClick={() => console.log("Elo jake")}>
                elo
              </DropdownItem>
              <DropdownItem>elo1</DropdownItem>
            </DropDown>
            <DropDown btnType={"primary"} title={"dropdown"} left></DropDown>
          </div>
        </Tile>
        <Tile
          tileSize={{
            sm: "sm-4",
            md: "md-4",
            lg: "lg-4",
            xl: "xl-4",
          }}
        >
          HOMEPAGE
          <div
            style={{
              display: "flex",
            }}
          >
            
              <EllipsisWrapper>
                Litwo ojczyzno moja ty jesteś jak zdrowie ten tylko się dowie
                kto cię straci,
              </EllipsisWrapper>
          </div>
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
