import React from "react";
import PropTypes from "prop-types";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import ModalWrapper from "../../../UI/Modal/ModalWrapper/ModalWrapper";
import CUEmployeeForm from "./CUEmployeeForm/CUEmployeeForm";

const CUEmployeeModal = React.memo((props) => {
  const {
    onCloseModal,
    onCreateEmployee,
    employeeActionLoading,
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
          loading={employeeActionLoading}
          onCloseModal={onCloseModal}
          onCreateEmployee={onCreateEmployee}
          onUpdateEmployee={onEditEmployee}
          editEmployee={editEmployee}
        />
      </ModalWrapper>
    </Backdrop>
  );
});

CUEmployeeModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  editEmployee: PropTypes.object,
  onEditEmployee: PropTypes.func,
  onCreateEmployee: PropTypes.func,
};

export default CUEmployeeModal
