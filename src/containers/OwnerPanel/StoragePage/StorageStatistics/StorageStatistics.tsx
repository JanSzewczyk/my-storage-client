import React from "react";
import { connect } from "react-redux";

import { StoreState } from "../../../../shared/types/store";
import StorageStatistic from "../../../../shared/types/statistic/StorageStatistic";

import StorageStatisticChart from "../../../../components/OwnerPanel/Storage/StorageStatisticChart/StorageStatisticChart";
import Tile, { TileContent } from "../../../../components/UI/DataDisplay/Tile";

interface StorageStatisticsProps {
  storageStatistics: StorageStatistic[];
  storageStatisticsLoading: boolean;
}

const StorageStatistics: React.FC<StorageStatisticsProps> = (props) => {
  const { storageStatistics, storageStatisticsLoading } = props;

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
};

const mapStateToProps = (state: StoreState) => {
  return {
    storageStatistics: state.statisticStore.storageStatistics,
    storageStatisticsLoading: state.statisticStore.storageStatisticsLoading,
  };
};

export default connect(mapStateToProps)(StorageStatistics);
