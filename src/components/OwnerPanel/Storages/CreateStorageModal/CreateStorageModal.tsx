import React from "react";
import axios from "../../../../shared/config/axios";

import Backdrop from "../../../UI/Backdrop/Backdrop";
import ModalWrapper from "../../../UI/Modal/ModalWrapper/ModalWrapper";
import StorageForm from "./StorageForm/StorageForm";
import useNotification from "../../../../hooks/useNotification";
import browserHistory from "../../../../shared/config/history";
import { Storage } from "../../../../shared/types/storage";

interface CreateStorageModalProps {
  onCloseModal: () => void;
}

const CreateStorageModal: React.FC<CreateStorageModalProps> = (props) => {
  const { onCloseModal } = props;

  const notification = useNotification();

  const onCreateStorage = (storage: Storage) => {
    axios.post(`storages`, storage).then((res) => {
      const newStorage = res.data;

      notification.add({
        content: `The storage ${newStorage.name} has been created`,
        type: "success",
      });

      browserHistory.push(`/storages/${newStorage.id}`);
    });
  };

  return (
    <Backdrop>
      <ModalWrapper title={"Create Storage"} onClose={onCloseModal}>
        <StorageForm
          onCloseModal={onCloseModal}
          onCreateStorage={onCreateStorage}
        />
      </ModalWrapper>
    </Backdrop>
  );
};

export default CreateStorageModal;
