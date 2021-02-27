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
import Label from "../../../UI/Inputs/Label";

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
    handleSubmit,
    errors,
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
          <DataView label={"Storage ID:"} data={defaultStorage.shortId} />

          <Label name={"name"}>Name</Label>
          <Input
            name={"name"}
            type={"text"}
            placeholder={"Storage Name"}
            ref={register({
              required: true,
            })}
            fullWidth
            isInvalid={Boolean(errors.name)}
          />

          <Label name={"surface"}>Surface</Label>
          <Input
            name={"surface"}
            type={"number"}
            placeholder={"Surface"}
            ref={register({
              required: true,
            })}
            fullWidth
            isInvalid={Boolean(errors.surface)}
          />

          <Label name={"addressStreet"}>Name</Label>
          <Input
            name={"addressStreet"}
            type={"text"}
            placeholder={"Address Street"}
            ref={register({
              required: true,
            })}
            fullWidth
            isInvalid={Boolean(errors.addressStreet)}
          />

          <Label name={"addressCity"}>City</Label>
          <Input
            name={"addressCity"}
            type={"text"}
            placeholder={"Address City"}
            ref={register({
              required: true,
            })}
            fullWidth
            isInvalid={Boolean(errors.addressCity)}
          />

          <Label name={"addressZip"}>Zip</Label>
          <Input
            name={"addressZip"}
            type={"text"}
            placeholder={"Address Zip"}
            ref={register({
              required: true,
            })}
            fullWidth
            isInvalid={Boolean(errors.addressZip)}
          />

          <Label name={"addressCountry"}>Country</Label>
          <Input
            name={"addressCountry"}
            type={"text"}
            placeholder={"Address Country"}
            ref={register({
              required: true,
            })}
            fullWidth
            isInvalid={Boolean(errors.addressCountry)}
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
