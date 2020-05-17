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
          Tile sad f sa ds asd asg sdg asdg asgd as dgasd asdg asd gasg
        </Tile>
        <Tile
          tileSize={{
            sm: "sm-12",
            md: "md-6",
            lg: "lg-4",
            xl: "xl-3",
          }}
          bottom={{}}
        >
          Tile asd gadgadgaidfasndf asdf asfj asdifas idjnf asjndfiaj sndija
          snfjan sdifjans djfinasd ijgasijd gasjdinf{" "}
        </Tile>
        <Tile
          tileSize={{
            sm: "sm-12",
            md: "md-6",
            lg: "lg-4",
            xl: "xl-3",
          }}
          header={{}}
        ></Tile>
        <Tile
          tileSize={{
            sm: "sm-12",
            md: "md-6",
            lg: "lg-4",
            xl: "xl-3",
          }}
        >
          Tile dfsg asg asdg asdg asdgasgsdgas das a sgdasag a dgsa agsdasdg ga
          d gdg as haj jjr ajrajr yjrt aeae a aeradh dh{" "}
        </Tile>
        <Tile
          tileSize={{
            sm: "sm-12",
            md: "md-6",
            lg: "lg-4",
            xl: "xl-3",
          }}
        >
          Tile sgsdgas das a sgdasag a dgsa agsdasdg ga d gdg as{" "}
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
