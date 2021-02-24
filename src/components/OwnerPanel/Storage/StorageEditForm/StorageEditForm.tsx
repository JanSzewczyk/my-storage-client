import React from "react";
import { useForm } from "react-hook-form";

import { dateToDateTimeString } from "../../../../shared/utils/dateUtils";
import { CUStorage, Storage } from "../../../../shared/types/storage";

import DataView from "../../../UI/DataDisplay/DataView/DataView";
import Button from "../../../UI/Inputs/Button/Button";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import Input from "../../../UI/Inputs/Input/Input";
import StorageEditFormType from "./StorageEditFormType";
import { TileContent, TileBottom } from "../../../UI/DataDisplay/Tile";

interface StorageEditFormProps {
  defaultStorage: Storage;
  onCloseEdit: () => void;
  onEditStorage: (storageId: string, updatedStorage: CUStorage) => void;
  onRemoveStorage: (storageId: string) => void;
}

const StorageEditForm: React.FC<StorageEditFormProps> = ({
  defaultStorage,
  onCloseEdit,
  onRemoveStorage,
  onEditStorage,
}) => {
  const {
    register,
    errors,
    handleSubmit,
    formState,
  } = useForm<StorageEditFormType>({
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

  const onSubmit = (formData: StorageEditFormType): void => {
    const data: CUStorage = {
      ...formData,
      surface: formData.surface,
    };

    onEditStorage(defaultStorage.id, data);
  };

  return (
    <Aux>
      <TileContent>
        <form>
          <Input
            inputType={"edit"}
            label={"Name:"}
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
              color={"warning"}
              onClick={() => onRemoveStorage(defaultStorage.id)}
            >
              Remove
            </Button>
            <Button
              color={"primary"}
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
};

export default StorageEditForm;
