import React, { useMemo, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Tile from "../../../UI/Tile/Tile";
import TileContent from "../../../UI/Tile/TileContent/TileContent";

const StorageStatistics = React.memo((props) => {
  const { storageId, onGetStorageStatistics } = props;

  useEffect(() => {
    onGetStorageStatistics(storageId);
  }, [onGetStorageStatistics, storageId]);

  return (
    <Tile
      tileSize={{
        sm: "sm-12",
        md: "md-6",
        lg: "lg-6",
        xl: "xl-6",
      }}
      header={{
        title: "Items",
        subtitle: "Items in stock",
      }}
    >
      <TileContent>
        
      </TileContent>
    </Tile>
  );
});

StorageStatistics.propTypes = {
  storageId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    storageStatistics: state.statistic.storageStatistics,
    storageStatisticsLoading: state.statistic.storageStatisticsLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStorageStatistics: (storageId) =>
      dispatch(action.getStorageStatistics(storageId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageStatistics);
