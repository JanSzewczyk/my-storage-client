import React, { useMemo, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Tile from "../../../UI/Tile/Tile";
import TileContent from "../../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../../UI/Tile/TileBottom/TileBottom";
import { updateObject, formatMoney } from "../../../../shared/utils/utility";
import Table from "../../../UI/Table/Table";
import Pagination from "../../../UI/Pagination/Pagination";

import "./StorageItems.scss";

const config = {
  columns: [
    {
      field: "productName",
      name: "Name",
    },
    {
      field: "amount",
      name: "Amount",
    },
    {
      field: "productValue",
      name: "Value",
      converter: (cellData, rowData) => formatMoney(cellData, "PLN"),
    },
    {
      field: "totalValue",
      name: "Total Value",
      converter: (cellData, rowData) => formatMoney(cellData, "PLN"),
    },
  ],
};

const StorageItems = React.memo((props) => {
  const {
    storageId,
    onGetStoregeItemsList,
    itemsList,
    pageInfo,
    itemsListLoading,
  } = props;

  const [query, setQuery] = useState({
    sort: [],
    page: 0,
    size: 20,
  });

  useEffect(() => {
    onGetStoregeItemsList(storageId, query);
  }, [onGetStoregeItemsList, query, storageId]);

  const onSortChanged = useCallback(
    (sort) => {
      setQuery(
        updateObject(query, {
          sort: sort,
        })
      );
    },
    [query]
  );

  const onPageChanged = useCallback(
    (index) => {
      setQuery(
        updateObject(query, {
          page: index,
        })
      );
    },
    [query]
  );

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
    itemsList: state.item.itemsList,
    pageInfo: state.item.pageInfo,
    itemsListLoading: state.item.itemsListLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStoregeItemsList: (storageId, queryData) =>
      dispatch(action.getStoregeItemsList(storageId, queryData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageItems);
