import React from "react";
import PropTypes from "prop-types";
import axios from "../../../../shared/config/axios";

import Backdrop from "../../../UI/Backdrop/Backdrop";
import ModalWrapper from "../../../UI/Modal/ModalWrapper/ModalWrapper";
import StorageForm from "./StorageForm/StorageForm";
import { useNotification } from "../../../../hooks";
import browserHistory from "../../../../shared/config/history";

const CreateStorageModal = (props) => {
  const { onCloseModal } = props;

  const notification = useNotification();

  const onCreateStorage = (storage) => {
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

CreateStorageModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default CreateStorageModal;
