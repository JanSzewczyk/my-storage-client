import React, { useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import useNotification from "../../../../hooks/useNotification";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { connect } from "react-redux";
import * as action from "../../../../store";

import { Storage } from "../../../../shared/types/storage";

import axios from "../../../../shared/config/axios";
import Tile from "../../../UI/Tile/Tile";
import Loading from "../../../UI/Loading/Loading";
import StoragePanel from "./StoragePanel/StoragePanel";
import StorageEditPanel from "./StorageEditPanel/StorageEditPanel";
import DropDown from "../../../UI/DropDown/DropDown";
import DropdownItem from "../../../UI/DropDown/DropdownItem/DropdownItem";

import browserHistory from "../../../../shared/config/history";
import StoreDispatch from "../../../../shared/types/store/StoreDispatch";
import StoreState from "../../../../shared/types/store/StoreState";

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

  const onRemoveStorage = useCallback(
    (storageId: string) => {
      axios.delete(`storages/${storageId}`).then((res) => {
        const storage = res.data;

        notification.add({
          content: `The storage id=${storage.id} has been removed`,
        });
        browserHistory.replace(`/storages`);
      });
    },
    [notification]
  );

  const storagePanel = useMemo(
    () => <StoragePanel storage={storage} onEdit={() => setEdit(true)} />,
    [storage]
  );

  const storageEditPanel = useMemo(
    () =>
      storage && (
        <StorageEditPanel
          defaultStorage={storage}
          onCloseEdit={() => setEdit(false)}
          onSetStorage={onSetStorage}
          onRemoveStorage={() => onRemoveStorage(storage.id)}
        />
      ),
    [onRemoveStorage, onSetStorage, storage]
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
        right: (
          <DropDown type={"icon"} icon={<MoreHorizIcon />}>
            <DropdownItem
              text={"Edit"}
              icon={<EditIcon />}
              onClick={() => setEdit(true)}
              disabled={edit}
            />
            <DropdownItem
              text={"Remove"}
              icon={<DeleteIcon />}
              disabled={!storage}
              onClick={() => storage && onRemoveStorage(storage.id)}
            />
          </DropDown>
        ),
      }}
    >
      {storageLoading ? <Loading /> : !edit ? storagePanel : storageEditPanel}
    </Tile>
  );
});

StorageDetails.propTypes = {
  storageId: PropTypes.string.isRequired,
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
    onSetStorage: (storage: Storage) => dispatch(action.setStorage(storage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageDetails);
