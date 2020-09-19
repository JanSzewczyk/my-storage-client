import React, { useEffect, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import axios from "../../../shared/config/axios";

import { connect } from "react-redux";
import * as action from "../../../store";

import PropTypes from "prop-types";
import Tile from "../../UI/Tile/Tile";
import EmployeeDetailsData from "./EmployeeDetailsData/EmployeeDetailsData";
import Loading from "../../UI/Loading/Loading";
import DropDown from "../../UI/DropDown/DropDown";
import DropdownItem from "../../UI/DropDown/DropdownItem/DropdownItem";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import CUEmployeeModal from "../../EmployeePanel/EmployeeTable/CUEmployeeModal/CUEmployeeModal";
import browserHistory from "../../../shared/config/history";
import { mapEmployeeDtoToEmployee } from "../../../shared/dataUtils/employeeUtils";
import { useNotification } from "../../../hooks";
import { useHistory } from "react-router-dom";

const EmployeeDetails = React.memo((props) => {
  const {
    employeeId,
    storageId,
    onGetEmployee,
    employee,
    employeeLoading,
    onSetEmployee,
  } = props;

  const notification = useNotification();
  const history = useHistory();
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    onGetEmployee(employeeId);
  }, [employeeId, onGetEmployee]);

  const onEditEmployee = (employeeId, updatedEmployee) => {
    axios.put(`employees/${employeeId}`, updatedEmployee).then((res) => {
      const updatedEmployee = res.data;

      notification.add({
        content: `Employee ID=${updatedEmployee.shortId} has been updated`,
        type: "success",
      });

      setShowEdit(false);

      if (storageId) {
        if (
          updatedEmployee.workPlace &&
          storageId !== updatedEmployee.workPlace.id
        ) {
          browserHistory.replace(
            `/storages/${updatedEmployee.workPlace.id}/employee/${updatedEmployee.id}`
          );
          onSetEmployee(mapEmployeeDtoToEmployee(updatedEmployee));
        } else {
          browserHistory.replace(`/employees/${updatedEmployee.id}`);
        }
      } else {
        onSetEmployee(mapEmployeeDtoToEmployee(updatedEmployee));
      }
    });
  };

  const removeEmployee = (employeeId) => {
    axios.delete(`employees/${employeeId}`).then((res) => {
      notification.add({
        content: `Successful remove employee, ID=${employeeId}`,
        type: "error",
      });
      history.push("/employees");
    });
  };

  const optionsDropdown = (
    <DropDown type={"icon"} icon={<MoreHorizIcon />}>
      <DropdownItem
        text={"Edit"}
        icon={<EditIcon />}
        onClick={() => setShowEdit(true)}
        disabled={!employee}
      />
      <DropdownItem
        text={"Remove"}
        icon={<DeleteIcon />}
        disabled={!employee}
        onClick={() => removeEmployee(employeeId)}
      />
    </DropDown>
  );

  return (
    <Aux>
      {showEdit && (
        <CUEmployeeModal
          onCloseModal={() => setShowEdit(false)}
          editEmployee={employee}
          onEditEmployee={onEditEmployee}
        />
      )}
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
          right: optionsDropdown,
        }}
      >
        {employeeLoading ? (
          <Loading />
        ) : (
          <EmployeeDetailsData employee={employee} />
        )}
      </Tile>
    </Aux>
  );
});

EmployeeDetails.propTypes = {
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
    onGetEmployee: (employeeId) => dispatch(action.getEmployee(employeeId)),
    onSetEmployee: (employee) => dispatch(action.setEmployee(employee)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);
