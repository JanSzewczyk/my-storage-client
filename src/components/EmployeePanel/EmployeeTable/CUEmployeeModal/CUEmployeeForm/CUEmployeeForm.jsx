import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useAxios from "../../../../../hooks/useAxios";

import ModalBody from "../../../../UI/Modal/ModalWrapper/ModalBody/ModalBody";
import ModalBottom from "../../../../UI/Modal/ModalWrapper/ModalBottom/ModalBottom";
import Button from "../../../../UI/Button/Button";
import Aux from "../../../../../hoc/Auxiliary/Auxiliary";
import Loading from "../../../../UI/Loading/Loading";
import Input from "../../../../UI/Input/Input";
import * as pattern from "../../../../../shared/patterns";
import Select from "../../../../UI/Select/Select";
import { createStoragesSelectList } from "../../../../../shared/data-utils/storageUtils";

import "./CUEmployeeForm.scss";

const CUEmployeeForm = (props) => {
  const {
    onCloseModal,
    onCreateEmployee,
    editEmployee,
    onUpdateEmployee,
  } = props;

  const [getStorages, { response, loading }] = useAxios({
    url: "storages",
    storyState: { response: [], error: null, loading: true },
  });

  const { register, errors, handleSubmit, watch, formState } = useForm({
    defaultValues: editEmployee
      ? {
          ...editEmployee,
          storageId: editEmployee.workPlace ? editEmployee.workPlace.id : null,
        }
      : {},
    mode: "onSubmit",
  });

  useEffect(() => {
    getStorages();
  }, [getStorages]);

  const onSubmit = (formData) => {
    if (editEmployee) {
      onUpdateEmployee(editEmployee.id, formData);
    } else {
      onCreateEmployee(formData);
    }
  };

  const validatePasswordMatch = () => {
    return watch("repeatPassword") === watch("password");
  };

  return loading ? (
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
            options={createStoragesSelectList(response)}
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
        <Button onClick={onCloseModal}>Cancel</Button>
        <Button
          btnType={"primary"}
          onClick={handleSubmit(onSubmit)}
          disabled={!formState.isDirty}
        >
          {editEmployee ? "Update" : "Add Employee"}
        </Button>
      </ModalBottom>
    </Aux>
  );
};

CUEmployeeForm.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  onCreateEmployee: PropTypes.func,
  onUpdateEmployee: PropTypes.func,
  editEmployee: PropTypes.object,
};

export default CUEmployeeForm;
