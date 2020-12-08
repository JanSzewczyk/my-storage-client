import React, { useEffect, useState, useMemo, useCallback } from "react";
import { AxiosResponse } from "axios";

import { connect } from "react-redux";
import * as action from "../../../../store";

import { mapStorageDtoToStorage } from "../../../../shared/data-utils/storageUtils";
import {
  CUStorage,
  Storage,
  StorageDto,
} from "../../../../shared/types/storage";
import useNotification from "../../../../hooks/useNotification";
import browserHistory from "../../../../shared/config/history";
import StoreDispatch from "../../../../shared/types/store/StoreDispatch";
import StoreState from "../../../../shared/types/store/StoreState";
import axios from "../../../../shared/config/axios";

import Loading from "../../../../components/UI/Loading/Loading";
import StorageData from "../../../../components/OwnerPanel/Storage/StorageData/StorageData";
import StorageEditForm from "../../../../components/OwnerPanel/Storage/StorageEditForm/StorageEditForm";
import Tile from "../../../../components/UI/DataDisplay/Tile";
import StorageDropdownOption from "../../../../components/OwnerPanel/Storage/StorageDropdownOption/StorageDropdownOption";

interface StorageDetailsProps {
  onGetStorage: (storageId: string) => void;
  storageId: string;
  storage: Storage | null;
  storageLoading: boolean;
  onSetStorage: (storage: Storage) => void;
}

const StorageDetails: React.FC<StorageDetailsProps> = React.memo((props) => {
  const {
    onGetStorage,
    storageId,
    storage,
    storageLoading,
    onSetStorage,
  } = props;

  const notification = useNotification();
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    onGetStorage(storageId);
  }, [onGetStorage, storageId]);

  const onEditStorage = useCallback(
    (storageId: string, updatedStorage: CUStorage) => {
      axios
        .put(`storages/${storageId}`, updatedStorage)
        .then((res: AxiosResponse<StorageDto>) => {
          const storage: Storage = mapStorageDtoToStorage(res.data);

          notification.add({
            content: `The ${storage.name} storage has been updated`,
            type: "success",
          });
          onSetStorage(storage);
          setEdit(false);
        });
    },
    [notification, onSetStorage]
  );

  const onRemoveStorage = useCallback(
    (storageId: string) => {
      axios
        .delete(`storages/${storageId}`)
        .then((res: AxiosResponse<StorageDto>) => {
          const storage: Storage = mapStorageDtoToStorage(res.data);

          notification.add({
            content: `The storage id=${storage.id} has been removed`,
          });
          browserHistory.replace(`/storages`);
        });
    },
    [notification]
  );

  const storagePanel = useMemo(() => <StorageData storage={storage} />, [
    storage,
  ]);

  const storageEditPanel = useMemo(
    () =>
      storage && (
        <StorageEditForm
          defaultStorage={storage}
          onCloseEdit={() => setEdit(false)}
          onEditStorage={onEditStorage}
          onRemoveStorage={() => onRemoveStorage(storage.id)}
        />
      ),
    [onEditStorage, onRemoveStorage, storage]
  );

  const storageDropdownOption = (
    <StorageDropdownOption
      onEditStorage={() => setEdit(true)}
      activeEditStorage={!edit}
      onRemoveStorage={() => storage && onRemoveStorage(storage.id)}
      activeRemoveStorage={!!storage}
    />
  );

  return (
    <Tile
      tileSize={{
        sm: "sm-12",
        md: "md-6",
        lg: "lg-4",
        xl: "xl-3",
      }}
      header={{
        title: "Storage",
        subtitle: "Storage information",
        // right: storageDropdownOption,
      }}
      right={storageDropdownOption}
    >
      {storageLoading ? <Loading /> : !edit ? storagePanel : storageEditPanel}
    </Tile>
  );
});

const mapStateToProps = (state: StoreState) => {
  return {
    storage: state.storageStore.storage,
    storageLoading: state.storageStore.storageLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetStorage: (storageId: string) => dispatch(action.getStorage(storageId)),
    onSetStorage: (storage: Storage) => dispatch(action.setStorage(storage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageDetails);
