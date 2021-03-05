import React, { useState } from "react";
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
  storage: Storage | null;
  storageLoading: boolean;
}

const StorageDetails: React.FC<StorageDetailsProps> = (props) => {
  const { onGetStorage, storage, storageLoading } = props;

  const notification = useNotification();

  const [edit, setEdit] = useState<boolean>(false);

  const editStorage = (storageId: string, updatedStorage: CUStorage): void => {
    axios
      .put(`storages/${storageId}`, updatedStorage)
      .then((res: AxiosResponse<StorageDto>) => {
        const updatedStorage: Storage = mapStorageDtoToStorage(res.data);

        notification.add({
          content: `The ${updatedStorage.name} storage has been updated`,
          type: "success",
        });
        setEdit(false);
        onGetStorage(updatedStorage.id);
      });
  };

  const removeStorage = (storageId: string): void => {
    axios
      .delete(`storages/${storageId}`)
      .then((res: AxiosResponse<StorageDto>) => {
        const storage: Storage = mapStorageDtoToStorage(res.data);

        notification.add({
          content: `The storage id=${storage.id} has been removed`,
        });
        browserHistory.replace(`/storages`);
      });
  };

  const storageDropdownOption = (
    <StorageDropdownOption
      onShowDetails={() => setEdit(false)}
      onEditStorage={() => setEdit(true)}
      activeEditStorage={edit}
      onRemoveStorage={() => storage && removeStorage(storage.id)}
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
      }}
      right={storageDropdownOption}
    >
      {storageLoading ? (
        <Loading />
      ) : (
        storage &&
        (!edit ? (
          <StorageData storage={storage} />
        ) : (
          <StorageEditForm
            defaultStorage={storage}
            onCloseEdit={() => setEdit(false)}
            onEditStorage={editStorage}
            onRemoveStorage={() => removeStorage(storage.id)}
          />
        ))
      )}
    </Tile>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    storage: state.storageStore.storage,
    storageLoading: state.storageStore.storageLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetStorage: (storageId: string) => dispatch(action.getStorage(storageId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageDetails);
