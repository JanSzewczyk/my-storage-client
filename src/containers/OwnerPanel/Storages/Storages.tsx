import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import * as action from "../../../store";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import AppContent from "../../../components/UI/AppContent/AppContent";
import Loading from "../../../components/UI/Loading/Loading";
import StorageItem from "../../../components/OwnerPanel/Storages/StorageItem/StorageItem";
import AddStorageTile from "../../../components/OwnerPanel/Storages/AddStorageTile/AddStorageTile";
import CreateStorageModal from "../../../components/OwnerPanel/Storages/CreateStorageModal/CreateStorageModal";
import withErrorHandler from "../../../hoc/withErrorHandler";
import { StoreDispatch, StoreState } from "../../../shared/types/store";
import { StorageView } from "../../../shared/types/storage";

interface StoragesProps {
  onGetStorageList: () => void;
  storageList: StorageView[];
  storageListLoading: boolean;
}

const Storages: React.FC<StoragesProps> = (props) => {
  const { onGetStorageList, storageList, storageListLoading } = props;

  const history = useHistory();

  const [showAddStorage, setShowAddStorage] = useState(false);

  useEffect(() => {
    onGetStorageList();
  }, [onGetStorageList]);

  const redirectToStorageHandler = useCallback(
    (storage: StorageView) => {
      history.push(`storages/${storage.id}`);
    },
    [history]
  );

  const storageItems = useMemo(
    () => (
      <Aux>
        {storageList.map((storage: StorageView, index: number) => (
          <StorageItem
            key={index}
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

const mapStateToProps = (state: StoreState) => {
  return {
    storageList: state.storageStore.storageViewList,
    storageListLoading: state.storageStore.storageViewListLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetStorageList: () => dispatch(action.getStorageList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Storages));
