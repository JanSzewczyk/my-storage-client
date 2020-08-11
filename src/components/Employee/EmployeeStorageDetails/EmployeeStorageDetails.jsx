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
  const { employeeId, employee, employeeLoading } = props;

  const [assignStorage, setAssignStorage] = useState(false);

  const assignStorageToEmployee = useMemo(
    () => (
      <AssignStorageToEmployee
        employeeId={employeeId}
        onClose={() => setAssignStorage(false)}
      />
    ),
    [employeeId]
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
      {employeeLoading ? (
        <Loading />
      ) : employee && employee.workPlace ? (
        !assignStorage ? (
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
          assignStorageToEmployee
        )
      ) : (
        <div>safsd</div>
      )}
    </Tile>
  );
});

EmployeeStorageDetails.propTypes = {
  employeeId: PropTypes.string.isRequired,
  storageId: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    employee: state.employee.employee,
    employeeLoading: state.employee.employeeLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onGetEmployee: (employeeId) => dispatch(action.getEmployee(employeeId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeStorageDetails);
