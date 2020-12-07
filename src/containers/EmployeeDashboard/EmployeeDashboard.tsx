import React, { useMemo, useState } from "react";

import { connect } from "react-redux";
// import * as action from "../../store";

import AppContent from "../../components/UI/Layout/AppContent/AppContent";
import Tile from "../../components/UI/Tile/Tile";
import StorageInforamtions from "../../components/EmployeeDashboard/StorageInforamtions/StorageInforamtions";
import ActionTile from "../../components/EmployeeDashboard/ActionTile/ActionTile";
import { StoreDispatch, StoreState } from "../../shared/types/store";
import User from "../../shared/types/user/User";
import { Employee } from "../../shared/types/employee";

interface EmployeeDashboardProps {
  user: User | null;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = (props) => {
  const { user } = props;

  const employeeUser: Employee | null = user as Employee;

  const [action, setAction] = useState<"STORE" | "REMOVE" | null>(null);

  const storageInf = useMemo(
    () =>
      employeeUser &&
      employeeUser.workPlace && (
        <StorageInforamtions
          storage={employeeUser.workPlace}
          onAction={setAction}
        />
      ),
    [employeeUser]
  );

  return (
    <AppContent>
      {employeeUser && employeeUser.workPlace ? (
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
      {action && employeeUser && employeeUser.workPlace && (
        <ActionTile
          action={action}
          onClose={() => setAction(null)}
          storageId={employeeUser.workPlace.id}
          ownerId={employeeUser.ownerId}
        />
      )}
    </AppContent>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    user: state.userStore.user,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    // onGetStorageList: () => dispatch(action.getStorageList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboard);
