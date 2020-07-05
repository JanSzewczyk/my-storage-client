import React, { useMemo, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Tile from "../../../UI/Tile/Tile";
import TileContent from "../../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../../UI/Tile/TileBottom/TileBottom";
import { updateObject } from "../../../../shared/utils/utility";
import { formatMoney } from "../../../../shared/utils/currencyUtils";
import Table from "../../../UI/Table/Table";
import Pagination from "../../../UI/Pagination/Pagination";
import { dateToDateTimeString } from "../../../../shared/utils/dateUtils";

import "./StorageActions.scss";

const config = {
  columns: [
    {
      field: "createdAt",
      name: "Date",
      converter: (cellData, rowData) => dateToDateTimeString(cellData),
    },
    {
      field: "action",
      name: "Action",
    },
    {
      field: "employeeFirstName",
      name: "Employee First Name",
    },
    {
      field: "employeeLastName",
      name: "Employee Last Name",
    },
    {
      field: "itemName",
      name: "Name",
    },
    {
      field: "itemAmount",
      name: "Amount",
    },
    {
      field: "itemValue",
      name: "Value",
      converter: (cellData, rowData) => formatMoney(cellData, "PLN"),
    },
    {
      field: "itemTotalValue",
      name: "Total Value",
      converter: (cellData, rowData) => formatMoney(cellData, "PLN"),
    },
  ],
};

const StorageActions = React.memo((props) => {
  const {
    storageId,
    onGetStorageActionsList,
    actionsList,
    pageInfo,
    actionsListLoading,
  } = props;

  const [query, setQuery] = useState({
    sort: [],
    page: 0,
    size: 20,
  });

  useEffect(() => {
    onGetStorageActionsList(storageId, query);
  }, [onGetStorageActionsList, query, storageId]);

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
        data={actionsList}
        sort={query.sort}
        onSortChanged={onSortChanged}
        loading={actionsListLoading}
      />
    ),
    [actionsList, actionsListLoading, onSortChanged, query.sort]
  );

  const pagination = useMemo(
    () => <Pagination pageInfo={pageInfo} onPageChanged={onPageChanged} />,
    [onPageChanged, pageInfo]
  );

  return (
    <Tile
      tileSize={{
        sm: "sm-12",
        md: "md-12",
        lg: "lg-6",
        xl: "xl-6",
      }}
      header={{
        title: "Actions",
      }}
    >
      <TileContent>
        <div className={"storage-actions"}>{itemsTable}</div>
      </TileContent>
      <TileBottom right={pagination} />
    </Tile>
  );
});

StorageActions.propTypes = { storageId: PropTypes.string.isRequired };

const mapStateToProps = (state) => {
  return {
    actionsList: state.action.actionsList,
    pageInfo: state.action.pageInfo,
    actionsListLoading: state.action.actionsListLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStorageActionsList: (storageId, queryData) =>
      dispatch(action.getStorageActionsList(storageId, queryData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageActions);
