import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Backdrop from "../../../UI/Backdrop/Backdrop";
import ModalWrapper from "../../../UI/Modal/ModalWrapper/ModalWrapper";
import StorageForm from "./StorageForm/StorageForm";

const CreateStorageModal = (props) => {
  const { onCloseModal, storageActionLoading, onCreateStorage } = props;

  return (
    <Backdrop>
      <ModalWrapper title={"Create Storage"} onClose={onCloseModal}>
        <StorageForm
          loading={storageActionLoading}
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

const mapStateToProps = (state) => {
  return {
    storageActionLoading: state.storage.storageActionLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateStorage: (newStore) => dispatch(action.createStorage(newStore)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStorageModal);
