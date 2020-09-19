import React, { useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { useNotification } from "../../../../hooks";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { connect } from "react-redux";
import * as action from "../../../../store";

import axios from "../../../../shared/config/axios";
import Tile from "../../../UI/Tile/Tile";
import Loading from "../../../UI/Loading/Loading";
import StoragePanel from "./StoragePanel/StoragePanel";
import StorageEditPanel from "./StorageEditPanel/StorageEditPanel";
import DropDown from "../../../UI/DropDown/DropDown";
import DropdownItem from "../../../UI/DropDown/DropdownItem/DropdownItem";

import browserHistory from "../../../../shared/config/history";

const StorageDetails = React.memo((props) => {
  const {
    onGetStorage,
    storageId,
    storage,
    storageLoading,
    onSetStorage,
  } = props;

  const notification = useNotification();

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    onGetStorage(storageId);
  }, [onGetStorage, storageId]);

  const onRemoveStorage = useCallback(
    (storageId) => {
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
    () => (
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
              onClick={() => onRemoveStorage(storage.id)}
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

const mapStateToProps = (state) => {
  return {
    storage: state.storage.storage,
    storageLoading: state.storage.storageLoading,
    storageEditLoading: state.storage.storageActionLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStorage: (storageId) => dispatch(action.getStorage(storageId)),
    onSetStorage: (storage) => dispatch(action.setStorage(storage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageDetails);
