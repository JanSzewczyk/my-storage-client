import React from "react";

import { connect } from "react-redux";
import * as action from "../../../store";

import AppBar from "../../../components/UI/AppBar/AppBar";
import AppContent from "../../../components/UI/AppContent/AppContent";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Tile from "../../../components/UI/Tile/Tile";
import DropDown from "../../../components/UI/DropDown/DropDown";
import DropdownItem from "../../../components/UI/DropDown/DropdownItem/DropdownItem";
import EllipsisWrapper from "../../../components/UI/EllipsisWrapper/EllipsisWrapper";
import Tooltip from "../../../components/UI/Tooltip/Tooltip";
import Button from "@UI/Button/Button";

import { log } from "@hoc/withNotificationProvider";

const Dashboard = (props) => {
  return (
    <Aux>
      <AppBar />
      <AppContent>
        <Tile
          tileSize={{
            sm: "sm-12",
            md: "md-6",
            lg: "lg-6",
            xl: "xl-6",
          }}
          header={{
            title: "TO DO",
            subtitle: "Thinks to do",
          }}
        >
          <Tooltip
            text={"Lorem Ipesetting industry. Lorem Ipsum"}
            type={"dotted"}
            position={"top-end"}
          >
            Lorem Ipsum is simply dummy text
          </Tooltip>
        </Tile>
        <Tile
          tileSize={{
            sm: "sm-12",
            md: "md-6",
            lg: "lg-6",
            xl: "xl-6",
          }}
          header={{
            title: "DONE",
            subtitle: "Thinks done",
          }}
        >
          <div
            style={{
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            sdfasd <span>fasdfsdfsd asdf s</span>
            <Tooltip
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"
              }
              type={"dotted"}
            >
              Lorem Ipsum is simply dummy text
            </Tooltip>
            fs asdf asdfsadfdsdfsdfsdfsd
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
            <Tooltip text={"ni chuja nie działa"}>
              <DropDown btnType={"primary"} title={"dropdown"} left></DropDown>
            </Tooltip>
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
              Litwo ojczyzno moja ty jesteś jak zdrowie ten tylko się dowie kto
              cię straci,
            </EllipsisWrapper>
            <Button clicked={() => log("sadfasdfsdfasdfasdf")}>asdasd</Button>
          </div>
        </Tile>
        <Tile
          tileSize={{
            sm: "sm-12",
            md: "md-12",
            lg: "lg-12",
            xl: "xl-12",
          }}
        >
          HOMEPAGE
          <div
            style={{
              display: "flex",
            }}
          >
            
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
