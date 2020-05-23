import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Tile from "../../../UI/Tile/Tile";
import Loading from "../../../UI/Loading/Loading";
import StoragePanel from "./StoragePanel/StoragePanel";

const StorageDetails = React.memo((props) => {
  const { onGetStorege, storageId, storage, storageLoading } = props;
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    onGetStorege(storageId);
  }, [onGetStorege, storageId]);

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
      {storageLoading ? <Loading /> : <StoragePanel storage={storage} />}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStorege: (storageId) => dispatch(action.getStorege(storageId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageDetails);
