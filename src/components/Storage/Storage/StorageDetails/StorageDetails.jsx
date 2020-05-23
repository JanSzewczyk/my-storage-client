import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Tile from "../../../UI/Tile/Tile";
import Loading from "../../../UI/Loading/Loading";
import StoragePanel from "./StoragePanel/StoragePanel";
import StorageEditPanel from "./StorageEditPanel/StorageEditPanel";

const StorageDetails = React.memo((props) => {
  const {
    onGetStorege,
    storageId,
    storage,
    storageLoading,
    onEditStorage,
    storageEditLoading,
  } = props;
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    onGetStorege(storageId);
  }, [onGetStorege, storageId]);

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
        loading={storageEditLoading}
      />
    ),
    [onEditStorage, storage, storageEditLoading]
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
        subtitle: "Storage informations",
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
    onGetStorege: (storageId) => dispatch(action.getStorege(storageId)),
    onEditStorage: (storageId, updatedStorage) =>
      dispatch(action.editStorege(storageId, updatedStorage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageDetails);
