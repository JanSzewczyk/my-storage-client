import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Tile from "../../../UI/Tile/Tile";
import Loading from "../../../UI/Loading/Loading";
import StoragePanel from "./StoragePanel/StoragePanel";
import StorageEditPanel from "./StorageEditPanel/StorageEditPanel";
import DropDown from "../../../UI/DropDown/DropDown";
import DropdownItem from "../../../UI/DropDown/DropdownItem/DropdownItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const StorageDetails = React.memo((props) => {
  const {
    onGetStorage,
    storageId,
    storage,
    storageLoading,
    onEditStorage,
    storageEditLoading,
    onRemoveStorage,
  } = props;

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    onGetStorage(storageId);
  }, [onGetStorage, storageId]);

  useEffect(() => {
    setEdit(false);
  }, [storage]);

  const storagePanel = useMemo(
    () => <StoragePanel storage={storage} onEdit={() => setEdit(true)} />,
    [storage]
  );

  const storageEditPanel = useMemo(
    () => (
      <StorageEditPanel
        defaultStorage={storage}
        onCloseEdit={() => setEdit(false)}
        onEditStorage={onEditStorage}
        onRemoveStorage={onRemoveStorage}
        loading={storageEditLoading}
      />
    ),
    [onEditStorage, onRemoveStorage, storage, storageEditLoading]
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
              text={"edit"}
              icon={<EditIcon />}
              onClick={() => setEdit(true)}
              disabled={edit}
            />
            <DropdownItem text={"remove"} icon={<DeleteIcon />} disabled />
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
    onEditStorage: (storageId, updatedStorage) =>
      dispatch(action.editStorage(storageId, updatedStorage)),
    onRemoveStorage: (storageId) => dispatch(action.removeStorage(storageId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageDetails);
