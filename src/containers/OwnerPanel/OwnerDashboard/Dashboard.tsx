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

import "./Dashboard.scss";
import Tabs, { Tab } from "../../../components/UI/Tabs";
import StoreDispatch from "../../../shared/types/store/StoreDispatch";
import AuthData from "../../../shared/types/auth/AuthData";
import Button from "../../../components/UI/Button";

interface BashboardProps {
  logout: (authData: AuthData) => void;
}

const Dashboard: React.FC<BashboardProps> = (props) => {
  // const { response, loading, error, sendRequest } = useAxios({
  //   url: `storages`,
  //   method: "GET",
  //   // options: {
  //   //   params: { gender },
  //   // },
  //   // trigger: null,
  //   // // // or
  //   // // // trigger: { gender }
  //   // forceDispatchEffect: () => false, // AUTO RUN only if gender is set
  // });

  // console.log(response);
  // console.log(loading);

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
          {/* <Tooltip
            text={"Lorem Ipesetting industry. Lorem Ipsum"}
            type={"dotted"}
            position={"top-end"}
          >
            Lorem Ipsum is simply dummy text
          </Tooltip> */}
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
              <Button>assdfsd</Button>
            </Tooltip>
            fs assdfsd
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
              <DropdownItem
                onClick={() => console.log("Elo jake")}
                text={"elo"}
              />

              {/* <DropdownItem onClick={sendRequest}>elo1</DropdownItem> */}
            </DropDown>

            {/* <Tooltip text={"ni chuja nie działa"}>
              <DropDown btnType={"primary"} title={"dropdown"} left></DropDown>
            </Tooltip> */}
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
            {/* <Button onClick={() => log("sadfasdfsdfasdfasdf")}>asdasd</Button> */}
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
          <Tabs>
            <Tab title={"Title 1"} disabled>
              CONTENT 1
            </Tab>
            <Tab title={"Title 2"}>CONTENT 2</Tab>
            <Tab title={"Title 3"}>CONTENT 3</Tab>
            <Tab title={"Title 4"}>CONTENT 4</Tab>
          </Tabs>
        </Tile>
      </AppContent>
    </Aux>
  );
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    logout: (authData: AuthData) => dispatch(action.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
