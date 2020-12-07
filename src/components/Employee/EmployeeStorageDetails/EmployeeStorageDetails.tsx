import React, { useMemo, useState } from "react";

import { connect } from "react-redux";
import * as action from "../../../store";

import Tile, { TileBottom } from "../../UI/Tile";
import Loading from "../../UI/Loading/Loading";
import EmployeeStorageData from "./EmployeeStorageData/EmployeeStorageData";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Inputs/Button";
import AssignStorageToEmployee from "./AssignStorageToEmployee/AssignStorageToEmployee";
import StoreState from "../../../shared/types/store/StoreState";
import StoreDispatch from "../../../shared/types/store/StoreDispatch";
import Employee from "../../../shared/types/employee/Employee";
import _ from "lodash";

interface EmployeeStorageDetailsProps {
  employeeId: string;
  storageId?: string;
  employee: Employee | null;
  employeeLoading: boolean;
  onSetEmployee: (employee: Employee) => void;
}

const EmployeeStorageDetails: React.FC<EmployeeStorageDetailsProps> = React.memo(
  (props) => {
    const {
      employeeId,
      storageId,
      employee,
      employeeLoading,
      onSetEmployee,
    } = props;

    const [assignStorage, setAssignStorage] = useState<boolean>(false);

    // TODO FIX THIS!!!!!!!!!!!!!!
    const employeeDetails = useMemo(
      () =>
        !_.isNull(employee) && !assignStorage ? (
          employee.workPlace ? (
            <Aux>
              <EmployeeStorageData storage={employee.workPlace} />
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
              <Button
                color={"primary"}
                onClick={() => setAssignStorage(true)}
              >
                Assign to Workplace
              </Button>
            </div>
          )
        ) : (
          !_.isNull(employee) && (
            <AssignStorageToEmployee
              employeeId={employeeId}
              storageId={storageId}
              storage={employee.workPlace}
              onClose={() => setAssignStorage(false)}
              onSetEmployee={onSetEmployee}
            />
          )
        ),
      [assignStorage, employee, employeeId, onSetEmployee, storageId]
    );

    return (
      <Tile
        tileSize={{
          sm: "sm-12",
          md: "md-6",
          lg: "lg-4",
          xl: "xl-3",
        }}
        header={{
          title: "Workplace",
          subtitle: "Employee Workplace",
        }}
      >
        {employeeLoading ? <Loading /> : employeeDetails}
      </Tile>
    );
  }
);

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
