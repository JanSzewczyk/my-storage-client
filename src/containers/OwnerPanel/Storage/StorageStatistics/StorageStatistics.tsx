import React, { useEffect } from "react";

import { connect } from "react-redux";
import * as action from "../../../../store";

import { StoreDispatch, StoreState } from "../../../../shared/types/store";
import StorageStatistic from "../../../../shared/types/statistic/StorageStatistic";

import StorageStatisticChart from "../../../../components/OwnerPanel/Storage/StorageStatisticChart/StorageStatisticChart";
import Tile, { TileContent } from "../../../../components/UI/DataDisplay/Tile";

interface StorageStatisticsProps {
  storageId: string;
  onGetStorageStatistics: (storageId: string) => void;
  storageStatistics: StorageStatistic[];
  storageStatisticsLoading: boolean;
}

const StorageStatistics: React.FC<StorageStatisticsProps> = React.memo(
  (props) => {
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
  }
);

const mapStateToProps = (state: StoreState) => {
  return {
    storageStatistics: state.statisticStore.storageStatistics,
    storageStatisticsLoading: state.statisticStore.storageStatisticsLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetStorageStatistics: (storageId: string) =>
      dispatch(action.getStorageStatistics(storageId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageStatistics);
