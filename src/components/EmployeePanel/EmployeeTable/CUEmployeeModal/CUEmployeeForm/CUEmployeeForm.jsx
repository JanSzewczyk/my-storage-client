import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import { connect } from "react-redux";
import * as action from "../../../../../store";

import ModalBody from "../../../../UI/Modal/ModalWrapper/ModalBody/ModalBody";
import ModalBottom from "../../../../UI/Modal/ModalWrapper/ModalBottom/ModalBottom";
import Button from "../../../../UI/Button/Button";
import Aux from "../../../../../hoc/Auxiliary/Auxiliary";
import Loading from "../../../../UI/Loading/Loading";
import Input from "../../../../UI/Input/Input";
import * as pattern from "../../../../../shared/patterns";
import Select from "../../../../UI/Select/Select";

import "./CUEmployeeForm.scss";

const CUEmployeeForm = (props) => {
  const {
    onCloseModal,
    loading,
    onCreateEmployee,
    storageList,
    storageListLoading,
    onGetStoregeList,
    editEmployee,
    onUpdateEmployee,
  } = props;

  const { register, errors, handleSubmit, watch, formState } = useForm({
    defaultValues: editEmployee ? editEmployee : {},
    mode: "onSubmit",
  });

  useEffect(() => {
    onGetStoregeList();
  }, [onGetStoregeList]);

  const onSubmit = (formData) => {
    if (editEmployee) {
      onUpdateEmployee(editEmployee.employeeId, formData);
    } else {
      onCreateEmployee(formData);
    }
  };

  const validatePasswordMatch = () => {
    return watch("repeatPassword") === watch("password");
  };

  return loading || storageListLoading ? (
    <Loading />
  ) : (
    <Aux>
      <ModalBody>
        <form className={"cu-employee-form"}>
          <Input
            label={"Email: "}
            config={{
              placeholder: "Email",
              type: "email",
              name: "email",
            }}
            refInput={register({
              required: true,
              pattern: pattern.email,
            })}
            hasError={errors.email}
            errorMessage={"Required email pattern."}
          />
          <Input
            label={"Password: "}
            config={{
              placeholder: "Password",
              type: "password",
              name: "password",
            }}
            refInput={register({
              required: !editEmployee,
              pattern: pattern.password,
            })}
            hasError={errors.password}
            errorMessage={"Invalid password."}
          />
          <Input
            label={"Repeat Password: "}
            config={{
              placeholder: "Repeat Password",
              type: "password",
              name: "repeatPassword",
            }}
            refInput={register({
              required: !editEmployee,
              validate: validatePasswordMatch,
            })}
            hasError={errors.repeatPassword}
            errorMessage={"Passwords do not match."}
          />
          <Select
            label={"Select working place: "}
            config={{
              name: "storageId",
            }}
            refSelect={register}
            options={storageList.map((i) => ({
              key: i.name,
              value: i.storageId,
            }))}
            hasError={errors.storageId}
          />
          <Input
            label={"First Name: "}
            config={{
              placeholder: "First Name",
              type: "text",
              name: "firstName",
            }}
            refInput={register({
              required: true,
              minLength: 3,
            })}
            hasError={errors.firstName}
            errorMessage={"Min length is 3."}
          />
          <Input
            label={"Last Name: "}
            config={{
              placeholder: "Last Name",
              type: "text",
              name: "lastName",
            }}
            refInput={register({
              required: true,
              minLength: 3,
            })}
            hasError={errors.lastName}
            errorMessage={"Min length is 3."}
          />
          <Input
            label={"Phone: "}
            config={{
              placeholder: "Phone",
              type: "text",
              name: "phone",
            }}
            refInput={register({
              required: true,
              pattern: pattern.phoneNumber,
            })}
            hasError={errors.phone}
            errorMessage={"Invalid phone number."}
          />
          <Input
            label={"Street: "}
            config={{
              placeholder: "Address Street",
              type: "text",
              name: "addressStreet",
            }}
            refInput={register({
              required: true,
              minLength: 3,
            })}
            hasError={errors.addressStreet}
            errorMessage={"Min length is 3."}
          />
          <Input
            label={"City: "}
            config={{
              placeholder: "Address City",
              type: "text",
              name: "addressCity",
            }}
            refInput={register({
              required: true,
              minLength: 3,
            })}
            hasError={errors.addressCity}
            errorMessage={"Min length is 3."}
          />
          <Input
            label={"Zip: "}
            config={{
              placeholder: "Address Zip",
              type: "text",
              name: "addressZip",
            }}
            refInput={register({
              required: true,
              minLength: 3,
            })}
            hasError={errors.addressZip}
            errorMessage={"Min length is 3."}
          />
          <Input
            label={"Country: "}
            config={{
              placeholder: "Address Country",
              type: "text",
              name: "addressCountry",
            }}
            refInput={register({
              required: true,
              minLength: 3,
            })}
            hasError={errors.addressCountry}
            errorMessage={"Min length is 3."}
          />
        </form>
      </ModalBody>
      <ModalBottom>
        <Button clicked={onCloseModal}>close</Button>
        <Button
          btnType={"primary"}
          clicked={handleSubmit(onSubmit)}
          disabled={!formState.dirty}
        >
          {editEmployee ? "update" : "add employee"}
        </Button>
      </ModalBottom>
    </Aux>
  );
};

CUEmployeeForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onCreateEmployee: PropTypes.func.isRequired,
  onUpdateEmployee: PropTypes.func.isRequired,
  editEmployee: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    storageList: state.storage.storageList,
    storageListLoading: state.storage.storageListLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStoregeList: () => dispatch(action.getStoregeList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CUEmployeeForm);
