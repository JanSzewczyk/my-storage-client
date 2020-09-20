import React, { useMemo, useState } from "react";

import { connect } from "react-redux";
import * as action from "../../store";

import AppContent from "../../components/UI/AppContent/AppContent";
import Tile from "../../components/UI/Tile/Tile";
import StorageInforamtions from "../../components/EmployeeDashboard/StorageInforamtions/StorageInforamtions";
import ActionTile from "../../components/EmployeeDashboard/ActionTile/ActionTile";

const EmployeeDashboard = (props) => {
  const { user } = props;

  const [action, setAction] = useState(null);

  const storageInf = useMemo(
    () => <StorageInforamtions storage={user.workPlace} onAction={setAction} />,
    [user.workPlace]
  );

  return (
    <AppContent>
      {user.workPlace ? (
        storageInf
      ) : (
        <Tile
          tileSize={{
            sm: "sm-12",
            md: "md-6",
            lg: "lg-4",
            xl: "xl-3",
          }}
        >
          NOT ASSIGNED TO STORAGE
        </Tile>
      )}
      {action && user.workPlace && (
        <ActionTile
          action={action}
          onClose={() => setAction(false)}
          storageId={user.workPlace.id}
          ownerId={user.ownerId}
        />
      )}
    </AppContent>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStorageList: () => dispatch(action.getStorageList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboard);
