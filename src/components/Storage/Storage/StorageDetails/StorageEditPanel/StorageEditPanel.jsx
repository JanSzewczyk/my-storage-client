import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import DataView from "../../../../UI/DataView/DataView";
import TileContent from "../../../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../../../UI/Tile/TileBottom/TileBottom";
import Button from "../../../../UI/Button/Button";
import Aux from "../../../../../hoc/Auxiliary/Auxiliary";
import Input from "../../../../UI/Input/Input";
import Loading from "../../../../UI/Loading/Loading";

const StorageEditPanel = React.memo((props) => {
  const { defaultStorage, onCloseEdit, onEditStorage, loading } = props;

  const { register, errors, handleSubmit, formState } = useForm({
    defaultValues: {
      name: defaultStorage.name,
      surface: defaultStorage.surface,
      addressStreet: defaultStorage.addressStreet,
      addressCity: defaultStorage.addressCity,
      addressZip: defaultStorage.addressZip,
      addressCountry: defaultStorage.addressCountry,
    },
    mode: "onChange",
  });

  const onSubmit = (formData) => {
    console.log(formData);
    onEditStorage(defaultStorage.storageId, formData);
  };

  return !loading ? (
    <Aux>
      <TileContent>
        <form>
          <Input
            inputType={"edit"}
            label={"Name: "}
            refInput={register({
              required: true,
            })}
            config={{
              placeholder: "Storage Name",
              type: "text",
              name: "name",
            }}
            hasError={errors.name}
          />

          <Input
            inputType={"edit"}
            label={"Surface: "}
            refInput={register({
              required: true,
            })}
            config={{
              placeholder: "Surface",
              type: "number",
              name: "surface",
            }}
            hasError={errors.surface}
          />

          <Input
            inputType={"edit"}
            label={"Street: "}
            refInput={register({
              required: true,
            })}
            config={{
              placeholder: "Address Street",
              type: "text",
              name: "addressStreet",
            }}
            hasError={errors.addressStreet}
          />
          <Input
            inputType={"edit"}
            label={"City: "}
            refInput={register({
              required: true,
            })}
            config={{
              placeholder: "Address City",
              type: "text",
              name: "addressCity",
            }}
            hasError={errors.addressCity}
          />
          <Input
            inputType={"edit"}
            label={"Zip: "}
            refInput={register({
              required: true,
            })}
            config={{
              placeholder: "Address Zip",
              type: "text",
              name: "addressZip",
            }}
            hasError={errors.addressZip}
          />
          <Input
            inputType={"edit"}
            label={"Country: "}
            refInput={register({
              required: true,
            })}
            config={{
              placeholder: "Address Country",
              type: "text",
              name: "addressCountry",
            }}
            hasError={errors.addressCountry}
          />
          <DataView
            label={"Created At:"}
            data={defaultStorage.createdAt.toLocaleString()}
          />
          <DataView
            label={"Updated At:"}
            data={defaultStorage.updatedAt.toLocaleString()}
          />
        </form>
      </TileContent>
      <TileBottom
        right={
          <Aux>
            <Button clicked={onCloseEdit}>back</Button>
            <Button
              btnType={"primary"}
              clicked={handleSubmit(onSubmit)}
              disabled={!formState.dirty}
            >
              update
            </Button>
          </Aux>
        }
      />
    </Aux>
  ) : (
    <Loading />
  );
});

StorageEditPanel.propTypes = {
  defaultStorage: PropTypes.object,
  onCloseEdit: PropTypes.func.isRequired,
  onEditStorage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default StorageEditPanel;
