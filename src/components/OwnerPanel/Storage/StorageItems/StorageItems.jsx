import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Tile from "../../../UI/Tile/Tile";
import TileContent from "../../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../../UI/Tile/TileBottom/TileBottom";
import { formatMoney } from "../../../../shared/utils/currencyUtils";
import Table from "../../../UI/Table";
import Pagination from "../../../UI/Pagination/Pagination";
import useQuery from "../../../../hooks/useQuery";

import "./StorageItems.scss";

const config = {
  columns: [
    {
      field: "productName",
      name: "Name",
      sorted: true,
    },
    {
      field: "amount",
      name: "Amount",
      sorted: true,
    },
    {
      field: "value",
      name: "Value",
      sorted: true,
      converter: (value, rowData) => formatMoney(value, rowData.currency),
    },
    {
      field: "totalValue",
      name: "Total Value",
      sorted: true,
      converter: (totalValue, rowData) =>
        formatMoney(totalValue, rowData.currency),
    },
  ],
};

const StorageItems = React.memo((props) => {
  const {
    storageId,
    onGetStorageItemViewList,
    itemsList,
    pageInfo,
    itemsListLoading,
  } = props;

  const { query, onSortChanged, onPageChanged } = useQuery({
    sort: [],
    page: 0,
    size: 20,
  });

  useEffect(() => {
    onGetStorageItemViewList(storageId, query);
  }, [onGetStorageItemViewList, query, storageId]);

  const itemsTable = useMemo(
    () => (
      <Table
        config={config}
        data={itemsList}
        sort={query.sort}
        onSortChanged={onSortChanged}
        loading={itemsListLoading}
      />
    ),
    [itemsList, itemsListLoading, onSortChanged, query.sort]
  );

  const pagination = useMemo(
    () => <Pagination pageInfo={pageInfo} onPageChanged={onPageChanged} />,
    [onPageChanged, pageInfo]
  );

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
        <div className={"storage-items"}>{itemsTable}</div>
      </TileContent>
      <TileBottom right={pagination} />
    </Tile>
  );
});

StorageItems.propTypes = {
  storageId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    itemsList: state.itemStore.itemViewList,
    pageInfo: state.itemStore.pageInfo,
    itemsListLoading: state.itemStore.itemViewListLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStorageItemViewList: (storageId, queryData) =>
      dispatch(action.getStorageItemViewList(storageId, queryData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageItems);
