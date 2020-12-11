import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import * as action from "../../../../store";

import axios from "../../../../shared/config/axios";
import browserHistory from "../../../../shared/config/history";
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
  onGetEmployee: (employeeId: string) => void;
  employeeLoading: boolean;
  onSetEmployee: (employee: Employee) => void;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = React.memo((props) => {
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
  const [showEdit, setShowEdit] = useState<boolean>(false);

  useEffect(() => {
    onGetEmployee(employeeId);
  }, [employeeId, onGetEmployee]);

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
        browserHistory.replace(
          `/storages/${updatedEmployee.workPlace.id}/employee/${updatedEmployee.id}`
        );
      } else {
        browserHistory.replace(`/employees/${updatedEmployee.id}`);
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
        {employeeLoading ? (
          <Loading />
        ) : (
          <EmployeeDetailsData employee={employee} />
        )}
      </Tile>
    </Aux>
  );
});

const mapStateToProps = (state: StoreState) => {
  return {
    employee: state.employeeStore.employee,
    employeeLoading: state.employeeStore.employeeLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetEmployee: (employeeId: string) =>
      dispatch(action.getEmployee(employeeId)),
    onSetEmployee: (employee: Employee) =>
      dispatch(action.setEmployee(employee)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails);
