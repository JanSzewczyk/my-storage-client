import React, { useEffect, useMemo, useCallback, useState } from "react";

import { connect } from "react-redux";
import * as action from "../../../store";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import AppContent from "../../../components/UI/AppContent/AppContent";
import Loading from "../../../components/UI/Loading/Loading";
import StorageItem from "../../../components/OwnerPanel/Storages/StorageItem/StorageItem";
import AddStorageTile from "../../../components/OwnerPanel/Storages/AddStorageTile/AddStorageTile";
import CreateStorageModal from "../../../components/OwnerPanel/Storages/CreateStorageModal/CreateStorageModal";
import withErrorHandler from "../../../hoc/withErrorHandler";

const Storages = (props) => {
  const { onGetStorageList, storageList, storageListLoading } = props;

  const [showAddStorage, setShowAddStorage] = useState(false);

  useEffect(() => {
    onGetStorageList();
  }, [onGetStorageList]);

  const redirectToStorageHandler = useCallback(
    (storage) => {
      props.history.push(`storages/${storage.storageId}`);
    },
    [props.history]
  );

  const storageItems = useMemo(
    () => (
      <Aux>
        {storageList.map((storage) => (
          <StorageItem
            key={storage.storageId}
            storage={storage}
            onRedirectToStorage={() => redirectToStorageHandler(storage)}
          />
        ))}
      </Aux>
    ),
    [redirectToStorageHandler, storageList]
  );

  const createStorageModal = useMemo(
    () => <CreateStorageModal onCloseModal={() => setShowAddStorage(false)} />,
    []
  );

  return (
    <AppContent>
      {showAddStorage && createStorageModal}
      {storageListLoading ? (
        <Loading />
      ) : (
        <Aux>
          {storageItems}
          <AddStorageTile onAddStorage={() => setShowAddStorage(true)} />
        </Aux>
      )}
    </AppContent>
  );
};

const mapStateToProps = (state) => {
  return {
    storageList: state.storage.storageList,
    storageListLoading: state.storage.storageListLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStorageList: () => dispatch(action.getStorageList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Storages));
