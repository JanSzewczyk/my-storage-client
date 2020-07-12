import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import ModalBody from "../../../../UI/Modal/ModalWrapper/ModalBody/ModalBody";
import ModalBottom from "../../../../UI/Modal/ModalWrapper/ModalBottom/ModalBottom";
import Button from "../../../../UI/Button/Button";
import Aux from "../../../../../hoc/Auxiliary/Auxiliary";
import Loading from "../../../../UI/Loading/Loading";
import Input from "../../../../UI/Input/Input";

import "./StorageForm.scss";

const StorageForm = (props) => {
  const { onCloseModal, loading, onCreateStorage } = props;

  const { register, errors, handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (formData) => {
    console.log(formData);
    onCreateStorage(formData);
  };

  return loading ? (
    <Loading />
  ) : (
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
            hasError={errors.name}
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
              required: true,
              min: 1,
            })}
            hasError={errors.surface}
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
        <Button btnType={"primary"} clicked={handleSubmit(onSubmit)}>
          create storage
        </Button>
      </ModalBottom>
    </Aux>
  );
};

StorageForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onCreateStorage: PropTypes.func.isRequired,
};

export default StorageForm;
