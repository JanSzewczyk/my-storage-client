import React, { useEffect, useMemo, useCallback, useState } from "react";

import { connect } from "react-redux";
import * as action from "../../store";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import AppContent from "../../components/UI/AppContent/AppContent";
import Loading from "../../components/UI/Loading/Loading";
import StorageItem from "../../components/Storage/Storages/StorageItem/StorageItem";
import AddStorageTile from "../../components/Storage/Storages/AddStorageTile/AddStorageTile";
import CreateStorageModal from "../../components/Storage/Storages/CreateStorageModal/CreateStorageModal"

const Storages = (props) => {
  const { onGetStoregeList, storageList, storageListLoading } = props;

  const [showAddStorage, setShowAddStorage] = useState(false);

  useEffect(() => {
    onGetStoregeList();
  }, [onGetStoregeList]);

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
            onRedirectToStorege={() => redirectToStorageHandler(storage)}
          />
        ))}
      </Aux>
    ),
    [redirectToStorageHandler, storageList]
  );

  return (
    <AppContent>
      {showAddStorage && (
        <CreateStorageModal onCloseModal={() => setShowAddStorage(false)} />
      )}
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
    onGetStoregeList: () => dispatch(action.getStoregeList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Storages);
