import React, { useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Tile from "../../../UI/Tile/Tile";
import TileContent from "../../../UI/Tile/TileContent/TileContent";
import Table from "../../../UI/Table";
import Pagination from "../../../UI/Pagination/Pagination";
import TileBottom from "../../../UI/Tile/TileBottom/TileBottom";
import useQuery from "../../../../hooks/useQuery";
import browserHistory from "../../../../shared/config/history";
import { dateToDateTimeString } from "../../../../shared/utils/dateUtils";

import "./StorageEmployees.scss";

const config = {
  columns: [
    {
      field: "shortId",
      name: "Employee ID",
      sorted: true,
    },
    {
      field: "name",
      name: "Name",
      sorted: true,
    },
    {
      field: "addressCity",
      name: "City",
      sorted: true,
    },
    {
      field: "addressCountry",
      name: "Country",
      sorted: true,
    },
    {
      field: "createdAt",
      name: "Created",
      sorted: true,
      converter: (cellData) => dateToDateTimeString(cellData),
    },
  ],
};

const StorageEmployees = React.memo((props) => {
  const {
    storageId,
    onGetStorageEmployeesList,
    employeeList,
    pageInfo,
    employeeListLoading,
  } = props;

  const { query, onSortChanged, onPageChanged } = useQuery({
    sort: [],
    page: 0,
    size: 20,
  });

  useEffect(() => {
    onGetStorageEmployeesList(storageId, query);
  }, [onGetStorageEmployeesList, query, storageId]);

  const redirectToEmployee = useCallback(
    (employee) => {
      browserHistory.push(`/storages/${storageId}/employee/${employee.id}`);
    },
    [storageId]
  );

  const table = useMemo(
    () => (
      <Table
        config={config}
        data={employeeList}
        sort={query.sort}
        onSortChanged={onSortChanged}
        onRowClick={redirectToEmployee}
        loading={employeeListLoading}
      />
    ),
    [
      employeeList,
      employeeListLoading,
      onSortChanged,
      query.sort,
      redirectToEmployee,
    ]
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
        lg: "lg-8",
        xl: "xl-9",
      }}
      header={{
        title: "Employees",
        subtitle: "Employees working in storage",
      }}
    >
      <TileContent>
        <div className={"storage-employees"}>{table}</div>
      </TileContent>
      <TileBottom right={pagination} />
    </Tile>
  );
});

StorageEmployees.propTypes = {
  storageId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    employeeList: state.employee.employeeList,
    pageInfo: state.employee.pageInfo,
    employeeListLoading: state.employee.employeeListLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStorageEmployeesList: (storageId, queryData) =>
      dispatch(action.getStorageEmployeesList(storageId, queryData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageEmployees);
