import React from "react";

import { connect } from "react-redux";
import * as action from "../../../store";

import AppBar from "../../../components/UI/Layout/AppBar/AppBar";
import AppContent from "../../../components/UI/Layout/AppContent/AppContent";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import EllipsisWrapper from "../../../components/UI/DataDisplay/EllipsisWrapper/EllipsisWrapper";

import "./Dashboard.scss";
import StoreDispatch from "../../../shared/types/store/StoreDispatch";
import AuthData from "../../../shared/types/auth/AuthData";
import Button from "../../../components/UI/Inputs/Button";
import Tile from "../../../components/UI/DataDisplay/Tile";
import Tooltip from "../../../components/UI/DataDisplay/Tooltip";
import Tabs, { Tab } from "../../../components/UI/DataDisplay/Tabs";

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
              position={"left"}
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"
              }
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
              <Tooltip
                text={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"
                }
              >
                <Button>button 2</Button>
              </Tooltip>
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
            <Tab title={"Title 3"}>
              <Tooltip
                text={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum"
                }
              >
                <Button>button 2</Button>
              </Tooltip>
            </Tab>
            <Tab title={"Title 4"}>CONTENT 4</Tab>
          </Tabs>
        </Tile>
      </AppContent>
    </Aux>
  );
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    logout: () => dispatch(action.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
