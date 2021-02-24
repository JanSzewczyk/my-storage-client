import React from "react";
import { useHistory } from "react-router-dom";
import { AxiosResponse } from "axios";

import axios from "../../../../../shared/config/axios";
import useNotification from "../../../../../hooks/useNotification";
import {
  CUStorage,
  Storage,
  StorageDto,
} from "../../../../../shared/types/storage";
import { mapStorageDtoToStorage } from "../../../../../shared/data-utils/storageUtils";

import Backdrop from "../../../../../components/UI/Backdrop/Backdrop";
import ModalWrapper from "../../../../../components/UI/Modal/ModalWrapper/ModalWrapper";
import CreateStorageForm from "../../../../../components/OwnerPanel/CreateStorageForm/CreateStorageForm";

interface CreateStorageProps {
  onCloseModal: () => void;
}

const CreateStorage: React.FC<CreateStorageProps> = (props) => {
  const { onCloseModal } = props;

  const history = useHistory();
  const notification = useNotification();

  const onCreateStorage = (newStorage: CUStorage): void => {
    axios
      .post(`storages`, newStorage)
      .then((res: AxiosResponse<StorageDto>) => {
        const newStorage: Storage = mapStorageDtoToStorage(res.data);

        notification.add({
          content: `The storage ${newStorage.name} has been created`,
          type: "success",
        });

        history.push(`/storages/${newStorage.id}`);
      });
  };

  return (
    <Backdrop>
      <ModalWrapper title={"Create Storage"} onClose={onCloseModal}>
        <CreateStorageForm
          onCloseModal={onCloseModal}
          onCreateStorage={onCreateStorage}
        />
      </ModalWrapper>
    </Backdrop>
  );
};

export default CreateStorage;
