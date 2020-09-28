import React from "react";
import { useForm } from "react-hook-form";
import axios from "../../../../../shared/config/axios";

import DataView from "../../../../UI/DataView/DataView";
import TileContent from "../../../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../../../UI/Tile/TileBottom/TileBottom";
import Button from "../../../../UI/Button/Button";
import Aux from "../../../../../hoc/Auxiliary/Auxiliary";
import Input from "../../../../UI/Input/Input";
import { dateToDateTimeString } from "../../../../../shared/utils/dateUtils";
import useNotification from "../../../../../hooks/useNotification";
import { mapStorageDtoToStorage } from "../../../../../shared/data-utils/storageUtils";
import { CUStorage, Storage } from "../../../../../shared/types/storage";
import StorageEditPanelFormType from "./StorageEditPanelFormType";

interface StorageEditPanelProps {
  defaultStorage: Storage;
  onCloseEdit: () => void;
  onSetStorage: (storage: Storage) => void;
  onRemoveStorage: (storageId: string) => void;
}

const StorageEditPanel: React.FC<StorageEditPanelProps> = React.memo(
  (props) => {
    const {
      defaultStorage,
      onCloseEdit,
      onSetStorage,
      onRemoveStorage,
    } = props;

    const notification = useNotification();

    const { register, errors, handleSubmit, formState } = useForm<
      StorageEditPanelFormType
    >({
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

    const onEditStorage = (storageId: string, updatedStorage: CUStorage) => {
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

    const onSubmit = (formData: StorageEditPanelFormType) => {
      const data: CUStorage = {
        ...formData,
      };

      onEditStorage(defaultStorage.id, data);
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
              hasError={Boolean(errors.name)}
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
              hasError={Boolean(errors.surface)}
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
              hasError={Boolean(errors.addressStreet)}
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
              hasError={Boolean(errors.addressCity)}
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
              hasError={Boolean(errors.addressZip)}
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
              hasError={Boolean(errors.addressCountry)}
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
              <Button
                btnType={"warning"}
                onClick={() => onRemoveStorage(defaultStorage.id)}
              >
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
  }
);

export default StorageEditPanel;
