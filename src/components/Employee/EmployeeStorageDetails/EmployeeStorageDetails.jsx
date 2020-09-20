import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../store";

import Tile, { TileBottom } from "../../UI/Tile";
import Loading from "../../UI/Loading/Loading";
import EmployeeStorageData from "./EmployeeStorageData/EmployeeStorageData";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button";
import AssignStorageToEmployee from "./AssignStorageToEmployee/AssignStorageToEmployee";

const EmployeeStorageDetails = React.memo((props) => {
  const {
    employeeId,
    storageId,
    employee,
    employeeLoading,
    onSetEmployee,
  } = props;

  const [assignStorage, setAssignStorage] = useState(false);

  const employeeDetails = useMemo(
    () =>
      !assignStorage ? (
        employee && employee.workPlace ? (
          <Aux>
            <EmployeeStorageData storage={employee.workPlace} />
            <TileBottom
              right={
                <Button
                  btnType={"primary"}
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
            <Button btnType={"primary"} onClick={() => setAssignStorage(true)}>
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
});

EmployeeStorageDetails.propTypes = {
  employeeId: PropTypes.string.isRequired,
  storageId: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    employee: state.employeeStore.employee,
    employeeLoading: state.employeeStore.employeeLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetEmployee: (employee) => dispatch(action.setEmployee(employee)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeStorageDetails);
