import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import axios from "../../../../../shared/config/axios";

import DataView from "../../../../UI/DataView/DataView";
import TileContent from "../../../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../../../UI/Tile/TileBottom/TileBottom";
import Button from "../../../../UI/Button/Button";
import Aux from "../../../../../hoc/Auxiliary/Auxiliary";
import Input from "../../../../UI/Input/Input";
import { dateToDateTimeString } from "../../../../../shared/utils/dateUtils";
import { useNotification } from "../../../../../hooks";
import { mapStorageDtoToStorage } from "../../../../../shared/dataUtils/storageUtils";

const StorageEditPanel = React.memo((props) => {
  const { defaultStorage, onCloseEdit, onSetStorage, onRemoveStorage } = props;

  const notification = useNotification();

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
    onEditStorage(defaultStorage.id, formData);
  };

  const onEditStorage = (storageId, updatedStorage) => {
    axios.put(`storages/${storageId}`, updatedStorage).then((res) => {
      const storage = res.data;

      notification.add({
        content: `The ${storage.name} storage has been updated`,
        type: "success",
      });
      onSetStorage(mapStorageDtoToStorage(storage));
      onCloseEdit();
    });
  };

  return (
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
            data={dateToDateTimeString(defaultStorage.createdAt)}
          />
          <DataView
            label={"Updated At:"}
            data={dateToDateTimeString(defaultStorage.updatedAt)}
          />
        </form>
      </TileContent>
      <TileBottom
        right={
          <Aux>
            <Button onClick={onCloseEdit}>Cancel</Button>
            <Button btnType={"warning"} onClick={onRemoveStorage}>
              Remove
            </Button>
            <Button
              btnType={"primary"}
              onClick={handleSubmit(onSubmit)}
              disabled={!formState.isDirty}
            >
              Update
            </Button>
          </Aux>
        }
      />
    </Aux>
  );
});

StorageEditPanel.propTypes = {
  defaultStorage: PropTypes.object,
  onCloseEdit: PropTypes.func.isRequired,
  onSetStorage: PropTypes.func.isRequired,
  onRemoveStorage: PropTypes.func.isRequired,
};

export default StorageEditPanel;
