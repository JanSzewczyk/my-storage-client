import React, { useEffect } from "react";

import { connect } from "react-redux";
import * as action from "../../../store";

import PropTypes from "prop-types";
import Tile from "../../UI/Tile/Tile";
import EmployeeDetailsData from "./EmployeeDetailsData/EmployeeDetailsData";
import Loading from "../../UI/Loading/Loading";

const EmployeeDetails = React.memo((props) => {
  const { employeeId, onGetEmployee, employee, employeeLoading } = props;

  useEffect(() => {
    onGetEmployee(employeeId);
  }, [employeeId, onGetEmployee]);

  return (
    <Tile
      tileSize={{
        sm: "sm-12",
        md: "md-6",
        lg: "lg-4",
        xl: "xl-3",
      }}
      header={{
        title: "Employee",
        subtitle: "Employee Details",
      }}
    >
      {employeeLoading ? (
        <Loading />
      ) : (
        <EmployeeDetailsData employee={employee} />
      )}
    </Tile>
  );
});

EmployeeDetails.propTypes = {
  employeeId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    employee: state.employee.employee,
    employeeLoading: state.employee.employeeLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetEmployee: (employeeId) => dispatch(action.getEmployee(employeeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);
