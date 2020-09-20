import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Tile from "../../../UI/Tile/Tile";
import TileContent from "../../../UI/Tile/TileContent/TileContent";
import StorageStatisticChart from "./StorageStatisticChart/StorageStatisticChart";

const StorageStatistics = React.memo((props) => {
  const {
    storageId,
    onGetStorageStatistics,
    storageStatistics,
    storageStatisticsLoading,
  } = props;

  useEffect(() => {
    onGetStorageStatistics(storageId);
  }, [onGetStorageStatistics, storageId]);

  return (
    <Tile
      tileSize={{
        sm: "sm-12",
        md: "md-12",
        lg: "lg-12",
        xl: "xl-12",
      }}
      header={{
        title: "Statistics",
        subtitle: "Item flow statistics",
      }}
    >
      <TileContent>
        <StorageStatisticChart
          loading={storageStatisticsLoading}
          statistics={storageStatistics}
        />
      </TileContent>
    </Tile>
  );
});

StorageStatistics.propTypes = {
  storageId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    storageStatistics: state.statisticStore.storageStatistics,
    storageStatisticsLoading: state.statisticStore.storageStatisticsLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStorageStatistics: (storageId) =>
      dispatch(action.getStorageStatistics(storageId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageStatistics);
