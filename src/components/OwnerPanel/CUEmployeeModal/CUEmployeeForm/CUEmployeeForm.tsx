import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosResponse } from "axios";

import axios from "../../../../shared/config/axios";
import * as pattern from "../../../../shared/patterns";
import {
  createStoragesSelectList,
  mapStorageDtoToStorage,
} from "../../../../shared/data-utils/storageUtils";
import { CUEmployee, Employee } from "../../../../shared/types/employee";
import { nullIfEmpty } from "../../../../shared/utils/stringUtils";
import { StorageDto, Storage } from "../../../../shared/types/storage";
import CUEmployeeFormType from "./CUEmployeeFormType";

import ModalBody from "../../../UI/Modal/ModalWrapper/ModalBody/ModalBody";
import ModalBottom from "../../../UI/Modal/ModalWrapper/ModalBottom/ModalBottom";
import Button from "../../../UI/Inputs/Button/Button";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import Loading from "../../../UI/Loading/Loading";
import Input from "../../../UI/Inputs/Input/Input";
import Select from "../../../UI/Inputs/Select/Select";

import "./CUEmployeeForm.scss";

interface CUEmployeeFormProps {
  onCloseModal: () => void;
  onCreateEmployee?: (newEmployee: CUEmployee) => void;
  editEmployee?: Employee;
  onUpdateEmployee?: (employeeId: string, updatedEmployee: CUEmployee) => void;
}

const CUEmployeeForm: React.FC<CUEmployeeFormProps> = (props) => {
  const {
    onCloseModal,
    onCreateEmployee,
    editEmployee,
    onUpdateEmployee,
  } = props;

  const {
    register,
    errors,
    handleSubmit,
    watch,
    formState,
  } = useForm<CUEmployeeFormType>({
    defaultValues: editEmployee
      ? {
          ...editEmployee,
          storageId: editEmployee.workPlace ? editEmployee.workPlace.id : "",
        }
      : {},
    mode: "onSubmit",
  });

  const [storages, setStorages] = useState<Storage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getStorages = useCallback(() => {
    setLoading(true);
    axios
      .get(`storages/list`)
      .then((res: AxiosResponse<StorageDto[]>) => {
        setStorages(res.data.map(mapStorageDtoToStorage));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getStorages();
  }, [getStorages]);

  const onSubmit = (formData: CUEmployeeFormType) => {
    const data: CUEmployee = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      addressStreet: formData.addressStreet,
      addressCity: formData.addressCity,
      addressZip: formData.addressZip,
      addressCountry: formData.addressCountry,
      storageId: nullIfEmpty(formData.storageId),
    };

    if (editEmployee) {
      onUpdateEmployee && onUpdateEmployee(editEmployee.id, data);
    } else {
      onCreateEmployee && onCreateEmployee(data);
    }
  };

  const validatePasswordMatch = (): boolean =>
    watch("repeatPassword") === watch("password");

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
            hasError={Boolean(errors.email)}
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
            hasError={Boolean(errors.password)}
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
            hasError={Boolean(errors.repeatPassword)}
            errorMessage={"Passwords do not match."}
          />
          <Select
            label={"Select working place: "}
            config={{
              name: "storageId",
            }}
            refSelect={register}
            options={createStoragesSelectList(storages)}
            hasError={Boolean(errors.storageId)}
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
            hasError={Boolean(errors.firstName)}
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
            hasError={Boolean(errors.lastName)}
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
            hasError={Boolean(errors.phone)}
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
            hasError={Boolean(errors.addressStreet)}
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
            hasError={Boolean(errors.addressCity)}
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
            hasError={Boolean(errors.addressZip)}
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
            hasError={Boolean(errors.addressCountry)}
            errorMessage={"Min length is 3."}
          />
        </form>
      </ModalBody>
      <ModalBottom>
        <Button onClick={onCloseModal}>Cancel</Button>
        <Button
          color={"primary"}
          onClick={handleSubmit(onSubmit)}
          disabled={!formState.isDirty}
        >
          {editEmployee ? "Update" : "Add Employee"}
        </Button>
      </ModalBottom>
    </Aux>
  );
};

export default CUEmployeeForm;
