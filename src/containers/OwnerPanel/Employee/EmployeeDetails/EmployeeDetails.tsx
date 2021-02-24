import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import * as action from "../../../../store";
import axios from "../../../../shared/config/axios";
import { mapEmployeeDtoToEmployee } from "../../../../shared/data-utils/employeeUtils";
import useNotification from "../../../../hooks/useNotification";
import StoreDispatch from "../../../../shared/types/store/StoreDispatch";
import StoreState from "../../../../shared/types/store/StoreState";
import Employee from "../../../../shared/types/employee/Employee";

import EmployeeDetailsData from "../../../../components/Employee/EmployeeDetailsData/EmployeeDetailsData";
import Loading from "../../../../components/UI/Loading/Loading";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import { CUEmployee } from "../../../../shared/types/employee";
import CUEmployeeModal from "../../../../components/OwnerPanel/CUEmployeeModal/CUEmployeeModal";
import Tile from "../../../../components/UI/DataDisplay/Tile";
import EmployeeDropdownOption from "../../../../components/Employee/EmployeeDropdownOption/EmployeeDropdownOption";

interface EmployeeDetailsProps {
  employeeId: string;
  storageId?: string;
  employee: Employee | null;
  employeeLoading: boolean;
  onSetEmployee: (employee: Employee) => void;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = (props) => {
  const {
    employeeId,
    storageId,
    employee,
    employeeLoading,
    onSetEmployee,
  } = props;

  const notification = useNotification();
  const history = useHistory();

  const [showEdit, setShowEdit] = useState<boolean>(false);

  const onEditEmployee = (employeeId: string, updatedEmployee: CUEmployee) => {
    axios.put(`employees/${employeeId}`, updatedEmployee).then((res) => {
      const updatedEmployee = res.data;

      notification.add({
        content: `Employee ID=${updatedEmployee.shortId} has been updated`,
        type: "success",
      });

      setShowEdit(false);

      onSetEmployee(mapEmployeeDtoToEmployee(updatedEmployee));
      if (
        updatedEmployee.workPlace &&
        storageId !== updatedEmployee.workPlace.id
      ) {
        history.replace(
          `/storages/${updatedEmployee.workPlace.id}/employee/${updatedEmployee.id}`
        );
      } else {
        history.replace(`/employees/${updatedEmployee.id}`);
      }
    });
  };

  const removeEmployee = (employeeId: string) => {
    axios.delete(`employees/${employeeId}`).then((res) => {
      notification.add({
        content: `Successful remove employee, ID=${employeeId}`,
        type: "error",
      });
      history.push("/employees");
    });
  };

  const employeeDropdownOption = (
    <EmployeeDropdownOption
      onEditEmployee={() => setShowEdit(true)}
      activeEditEmployee={Boolean(employee)}
      onRemoveEmployee={() => removeEmployee(employeeId)}
      activeRemoveEmployee={Boolean(employee)}
    />
  );

  return (
    <Aux>
      {showEdit && employee && (
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
        }}
        right={employeeDropdownOption}
      >
        {!employeeLoading && employee ? (
          <EmployeeDetailsData employee={employee} />
        ) : (
          <Loading />
        )}
      </Tile>
    </Aux>
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);
