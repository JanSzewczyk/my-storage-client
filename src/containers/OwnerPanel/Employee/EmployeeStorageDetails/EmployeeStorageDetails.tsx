import React, { useState } from "react";
import { connect } from "react-redux";

import * as action from "../../../../store";
import StoreState from "../../../../shared/types/store/StoreState";
import StoreDispatch from "../../../../shared/types/store/StoreDispatch";
import Employee from "../../../../shared/types/employee/Employee";

import Tile, { TileBottom } from "../../../../components/UI/DataDisplay/Tile";
import Loading from "../../../../components/UI/Loading/Loading";
import AssignStorageToEmployee from "../../../../components/Employee/AssignStorageToEmployee/AssignStorageToEmployee";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import Button from "../../../../components/UI/Inputs/Button";
import StorageData from "../../../../components/OwnerPanel/Storage/StorageData/StorageData";

interface EmployeeStorageDetailsProps {
  employeeId: string;
  storageId?: string;
  employee: Employee | null;
  employeeLoading: boolean;
  onSetEmployee: (employee: Employee) => void;
}

const EmployeeStorageDetails: React.FC<EmployeeStorageDetailsProps> = (
  props
) => {
  const {
    employeeId,
    storageId,
    employee,
    employeeLoading,
    onSetEmployee,
  } = props;

  const [assignStorage, setAssignStorage] = useState<boolean>(false);

  return (
    <Tile
      tileSize={{
        sm: "sm-12",
        md: "md-12",
        lg: "lg-6",
        xl: "xl-3",
      }}
      header={{
        title: "Workplace",
        subtitle: "Employee Workplace",
      }}
    >
      {!employeeLoading && employee ? (
        !assignStorage ? (
          employee.workPlace ? (
            <Aux>
              <StorageData storage={employee.workPlace} />
              <TileBottom
                right={
                  <Button
                    color={"primary"}
                    onClick={() => setAssignStorage(true)}
                  >
                    Change
                  </Button>
                }
              />
            </Aux>
          ) : (
            <div>
              <h4>This employee is not assigned to any warehouse :(</h4>
              <h6>You can do this by clicking the button below</h6>
              <Button color={"primary"} onClick={() => setAssignStorage(true)}>
                Assign to Workplace
              </Button>
            </div>
          )
        ) : (
          <AssignStorageToEmployee
            employeeId={employeeId}
            storageId={storageId}
            storage={employee.workPlace}
            onClose={() => setAssignStorage(false)}
            onSetEmployee={onSetEmployee}
          />
        )
      ) : (
        <Loading />
      )}
    </Tile>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    employee: state.employeeStore.employee,
    employeeLoading: state.employeeStore.employeeLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onSetEmployee: (employee: Employee) =>
      dispatch(action.setEmployee(employee)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeStorageDetails);
