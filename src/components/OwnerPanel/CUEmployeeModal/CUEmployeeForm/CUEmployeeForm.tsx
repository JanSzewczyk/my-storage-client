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
import Loading from "../../../UI/Loading/Loading";
import Select from "../../../UI/Inputs/Select/Select";
import Label from "../../../UI/Inputs/Label";
import ValidationError from "../../../UI/Inputs/ValidationError";
import Input from "../../../UI/Inputs/Input";

import "./CUEmployeeForm.scss";

interface CUEmployeeFormProps {
  onCloseModal: () => void;
  onCreateEmployee?: (newEmployee: CUEmployee) => void;
  editEmployee?: Employee;
  onUpdateEmployee?: (employeeId: string, updatedEmployee: CUEmployee) => void;
}

const CUEmployeeForm: React.FC<CUEmployeeFormProps> = ({
  onCloseModal,
  onCreateEmployee,
  editEmployee,
  onUpdateEmployee,
}) => {
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
    <form className={"cu-employee-form"}>
      <h5
        style={{
          margin: "0 0 8px 0",
        }}
      >
        Please complete the form below
      </h5>
      <ModalBody>
        <div className={"cu-employee-form__content"}>
          <div className={"cu-employee-form__container"}>
            <Label name={"email"}>Email</Label>
            <Input
              name={"email"}
              type={"email"}
              placeholder={"Email"}
              ref={register({
                required: true,
                pattern: pattern.email,
              })}
              fullWidth
              autoFocus
              isInvalid={Boolean(errors.email)}
            />
            <ValidationError hasError={Boolean(errors.email)}>
              Required email pattern
            </ValidationError>
            <Label name={"password"}>Password</Label>
            <Input
              name={"password"}
              type={"password"}
              placeholder={"Password"}
              ref={register({
                required: !editEmployee,
                pattern: pattern.password,
              })}
              fullWidth
              isInvalid={Boolean(errors.password)}
            />
            <ValidationError hasError={Boolean(errors.password)}>
              Invalid password
            </ValidationError>
            <Label name={"repeatPassword"}>Repeat Password</Label>
            <Input
              name={"repeatPassword"}
              type={"password"}
              placeholder={"Repeat Password"}
              ref={register({
                required: !editEmployee,
                validate: validatePasswordMatch,
              })}
              fullWidth
              isInvalid={Boolean(errors.repeatPassword)}
            />
            <ValidationError hasError={Boolean(errors.repeatPassword)}>
              Passwords do not match.
            </ValidationError>
            <Select
              label={"Select working place: "}
              config={{
                name: "storageId",
              }}
              refSelect={register}
              options={createStoragesSelectList(storages)}
              hasError={Boolean(errors.storageId)}
            />
            <Label name={"firstName"}>First Name</Label>
            <Input
              name={"firstName"}
              type={"text"}
              placeholder={"First Name"}
              ref={register({
                required: true,
                minLength: 3,
              })}
              fullWidth
              isInvalid={Boolean(errors.firstName)}
            />
            <ValidationError hasError={Boolean(errors.firstName)}>
              Min length is 3.
            </ValidationError>
            <Label name={"lastName"}>Last Name</Label>
            <Input
              name={"lastName"}
              type={"text"}
              placeholder={"Last Name"}
              ref={register({
                required: true,
                minLength: 3,
              })}
              fullWidth
              isInvalid={Boolean(errors.lastName)}
            />
            <ValidationError hasError={Boolean(errors.lastName)}>
              Min length is 3.
            </ValidationError>
          </div>
          <div className={"cu-employee-form__container"}>
            <Label name={"phone"}>Phone</Label>
            <Input
              name={"phone"}
              type={"text"}
              placeholder={"Phone"}
              ref={register({
                required: true,
                pattern: pattern.phoneNumber,
              })}
              fullWidth
              isInvalid={Boolean(errors.phone)}
            />
            <ValidationError hasError={Boolean(errors.phone)}>
              Invalid phone number.
            </ValidationError>

            <Label name={"addressStreet"}>Street</Label>
            <Input
              name={"addressStreet"}
              type={"text"}
              placeholder={"Address Street"}
              ref={register({
                required: true,
                minLength: 3,
              })}
              fullWidth
              isInvalid={Boolean(errors.addressStreet)}
            />
            <ValidationError hasError={Boolean(errors.addressStreet)}>
              Min length is 3.
            </ValidationError>
            <Label name={"addressCity"}>City</Label>
            <Input
              name={"addressCity"}
              type={"text"}
              placeholder={"Address City"}
              ref={register({
                required: true,
                minLength: 3,
              })}
              fullWidth
              isInvalid={Boolean(errors.addressCity)}
            />
            <ValidationError hasError={Boolean(errors.addressCity)}>
              Min length is 3.
            </ValidationError>
            <Label name={"addressZip"}>Zip</Label>
            <Input
              name={"addressZip"}
              type={"text"}
              placeholder={"Address Zip"}
              ref={register({
                required: true,
                minLength: 3,
              })}
              fullWidth
              isInvalid={Boolean(errors.addressZip)}
            />
            <ValidationError hasError={Boolean(errors.addressZip)}>
              Min length is 3.
            </ValidationError>
            <Label name={"addressCountry"}>Country</Label>
            <Input
              name={"addressCountry"}
              type={"text"}
              placeholder={"Address Country"}
              ref={register({
                required: true,
                minLength: 3,
              })}
              fullWidth
              isInvalid={Boolean(errors.addressCountry)}
            />
            <ValidationError hasError={Boolean(errors.addressCountry)}>
              Min length is 3.
            </ValidationError>
          </div>
        </div>
      </ModalBody>
      <ModalBottom>
        <Button onClick={onCloseModal}>Cancel</Button>
        <Button
          type={"submit"}
          color={"primary"}
          onClick={handleSubmit(onSubmit)}
          disabled={!formState.isDirty}
        >
          {editEmployee ? "Update" : "Add Employee"}
        </Button>
      </ModalBottom>
    </form>
  );
};

export default CUEmployeeForm;
