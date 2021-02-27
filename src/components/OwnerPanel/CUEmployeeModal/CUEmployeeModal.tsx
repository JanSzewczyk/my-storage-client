import React from "react";

import { CUEmployee } from "../../../shared/types/employee";
import Employee from "../../../shared/types/employee/Employee";

import Backdrop from "../../UI/Backdrop/Backdrop";
import ModalWrapper from "../../UI/Modal/ModalWrapper/ModalWrapper";
import CUEmployeeForm from "./CUEmployeeForm/CUEmployeeForm";

interface CUEmployeeModalProps {
  onCloseModal: () => void;
  onCreateEmployee?: (newEmployee: CUEmployee) => void;
  editEmployee?: Employee;
  onEditEmployee?: (employeeId: string, updatedEmployee: CUEmployee) => void;
}

const CUEmployeeModal: React.FC<CUEmployeeModalProps> = (props) => {
  const {
    onCloseModal,
    onCreateEmployee,
    editEmployee,
    onEditEmployee,
  } = props;

  return (
    <Backdrop>
      <ModalWrapper
        title={!editEmployee ? "Create Employee" : "Edit Employee"}
        onClose={onCloseModal}
      >
        <CUEmployeeForm
          onCloseModal={onCloseModal}
          onCreateEmployee={onCreateEmployee}
          onUpdateEmployee={onEditEmployee}
          editEmployee={editEmployee}
        />
      </ModalWrapper>
    </Backdrop>
  );
};

export default CUEmployeeModal;
