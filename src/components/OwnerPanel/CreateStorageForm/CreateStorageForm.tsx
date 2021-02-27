import React from "react";
import { useForm } from "react-hook-form";

import { CUStorage } from "../../../shared/types/storage";
import CreateStorageFormType from "./CreateStorageFormType";

import ModalBody from "../../UI/Modal/ModalWrapper/ModalBody/ModalBody";
import ModalBottom from "../../UI/Modal/ModalWrapper/ModalBottom/ModalBottom";
import Button from "../../UI/Inputs/Button/Button";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Input from "../../UI/Inputs/Input/Input";
import ValidationError from "../../UI/Inputs/ValidationError";
import Label from "../../UI/Inputs/Label";

import "./CreateStorageForm.scss";

interface StorageFormProps {
  onCloseModal: () => void;
  onCreateStorage: (newStorage: CUStorage) => void;
}

const CreateStorageForm: React.FC<StorageFormProps> = ({
  onCloseModal,
  onCreateStorage,
}) => {
  const { register, errors, handleSubmit } = useForm<CreateStorageFormType>({
    mode: "onSubmit",
  });

  const onSubmit = (formData: CreateStorageFormType): void => {
    const data: CUStorage = {
      ...formData,
      surface: Number(formData.surface),
    };

    onCreateStorage(data);
  };

  return (
    <Aux>
      <form className={"storage-form"}>
        <ModalBody className={"storage-form__content"}>
          <Label name={"name"}>Name</Label>
          <Input
            name={"name"}
            type={"text"}
            placeholder={"Storage Name"}
            ref={register({
              required: true,
              minLength: 3,
              maxLength: 255,
            })}
            fullWidth
            autoFocus
            isInvalid={Boolean(errors.name)}
          />
          <ValidationError hasError={Boolean(errors.name)}>
            Required length is from 3 to 255.
          </ValidationError>
          <Label name={"surface"}>Amount of items</Label>
          <Input
            name={"surface"}
            type={"number"}
            placeholder={"Surface"}
            ref={register({
              required: true,
              min: 1,
            })}
            fullWidth
            isInvalid={Boolean(errors.surface)}
          />
          <ValidationError hasError={Boolean(errors.surface)}>
            Min value is 1.
          </ValidationError>
          <Label name={"addressStreet"}>Street</Label>
          <Input
            name={"addressStreet"}
            type={"text"}
            placeholder={"Address Street"}
            ref={register({
              required: true,
              minLength: 3,
              maxLength: 255,
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
              maxLength: 255,
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
              maxLength: 255,
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
              maxLength: 255,
            })}
            fullWidth
            isInvalid={Boolean(errors.addressCountry)}
          />
          <ValidationError hasError={Boolean(errors.addressCountry)}>
            Min length is 3.
          </ValidationError>
        </ModalBody>
        <ModalBottom>
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button
            type={"submit"}
            color={"primary"}
            onClick={handleSubmit(onSubmit)}
          >
            Create Storage
          </Button>
        </ModalBottom>
      </form>
    </Aux>
  );
};

export default CreateStorageForm;
