import React from "react";
import { useForm } from "react-hook-form";

import { CUStorage } from "../../../shared/types/storage";
import CreateStorageFormType from "./CreateStorageFormType";

import ModalBody from "../../UI/Modal/ModalWrapper/ModalBody/ModalBody";
import ModalBottom from "../../UI/Modal/ModalWrapper/ModalBottom/ModalBottom";
import Button from "../../UI/Button/Button";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Input from "../../UI/Input/Input";

import "./CreateStorageForm.scss";

interface StorageFormProps {
  onCloseModal: () => void;
  onCreateStorage: (newStorage: CUStorage) => void;
}

const CreateStorageForm: React.FC<StorageFormProps> = (props) => {
  const { onCloseModal, onCreateStorage } = props;

  const { register, errors, handleSubmit } = useForm<CreateStorageFormType>({
    mode: "onSubmit",
  });

  const onSubmit = (formData: CreateStorageFormType) => {
    const data: CUStorage = {
      ...formData,
      surface: formData.surface === null ? null : Number(formData.surface),
    };

    onCreateStorage(data);
  };

  return (
    <Aux>
      <ModalBody>
        <form className={"storage-form"}>
          <Input
            label={"Name: "}
            config={{
              placeholder: "Storage Name",
              type: "text",
              name: "name",
            }}
            refInput={register({
              required: true,
              minLength: 3,
              maxLength: 255,
            })}
            hasError={Boolean(errors.name)}
            errorMessage={"Required length is from 3 to 255."}
          />
          <Input
            label={"Surface: "}
            config={{
              placeholder: "Surface",
              type: "number",
              name: "surface",
            }}
            refInput={register({
              // required: true,
              min: 1,
            })}
            hasError={Boolean(errors.surface)}
            errorMessage={"Min value is 1."}
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
        <Button btnType={"primary"} onClick={handleSubmit(onSubmit)}>
          Create Storage
        </Button>
      </ModalBottom>
    </Aux>
  );
};

export default CreateStorageForm;
