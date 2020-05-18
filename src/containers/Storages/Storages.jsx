import React, { useEffect } from "react";

import { connect } from "react-redux";
import * as action from "../../store";

import Button from "../../components/UI/Button/Button";
import AddIcon from "@material-ui/icons/Add";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import AppBar from "../../components/UI/AppBar/AppBar";
import AppContent from "../../components/UI/AppContent/AppContent";
import Loading from "../../components/UI/Loading/Loading";

const Storages = (props) => {
  const { onGetStoregeList } = props;
  useEffect(() => {
    onGetStoregeList();
  }, [onGetStoregeList]);

  return (
    <Aux>
      <AppBar
        right={
          <Button btnType={"primary"}>
            <AddIcon />
            create storage
          </Button>
        }
      />
      <AppContent>
        <Loading />
      </AppContent>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated:
      state.auth.accessToken !== null && state.user.user && state.user.role,
    userRole: state.user.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStoregeList: () => dispatch(action.getStoregeList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Storages);
