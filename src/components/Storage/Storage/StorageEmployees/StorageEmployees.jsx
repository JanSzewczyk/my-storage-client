import React, { useState, useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Tile from "../../../UI/Tile/Tile";
import TileContent from "../../../UI/Tile/TileContent/TileContent";
import Table from "../../../UI/Table/Table";
import { updateObject } from "../../../../shared/utility";

import "./StorageEmployees.scss";
import Pagination from "../../../UI/Pagination/Pagination";
import TileBottom from "../../../UI/Tile/TileBottom/TileBottom";

const config = {
  columns: [
    {
      field: "firstName",
      name: "First name",
      // converter: (cellData, rowData) => `${cellData} chuj`,
    },
    {
      field: "lastName",
      name: "Last name",
    },
    {
      field: "addressCity",
      name: "City",
    },
    {
      field: "addressCountry",
      name: "Country",
    },
  ],
  // actions: [
  //   {
  //     name: "delete",
  //     action: (rowData) => console.log(`Delete ${rowData.first}`),
  //   },
  //   {
  //     name: "edit",
  //     action: (rowData) => console.log(`Edit ${rowData.first}`),
  //   },
  // ],
};

const StorageEmployees = React.memo((props) => {
  const {
    storageId,
    onGetStoregeEmployeesList,
    employeeList,
    pageInfo,
    employeeListLoading,
  } = props;

  const [query, setQuery] = useState({
    sort: [],
    page: 0,
    size: 3,
  });

  useEffect(() => {
    onGetStoregeEmployeesList(storageId, query);
  }, [onGetStoregeEmployeesList, query, storageId]);

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

  const onPageChanged = (index) => {
    setQuery(
      updateObject(query, {
        page: index,
      })
    );
  };

  const onRowClick = useCallback((data) => {
    console.log(data);
  }, []);

  const table = useMemo(
    () => (
      <Table
        config={config}
        data={employeeList}
        sort={query.sort}
        onSortChanged={onSortChanged}
        onRowClick={onRowClick}
        loading={employeeListLoading}
      />
    ),
    [employeeList, employeeListLoading, onRowClick, onSortChanged, query.sort]
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
        <div
          style={{
            height: "450px",
            overflowY: "auto",
          }}
        >
          {table}
        </div>
      </TileContent>
      <TileBottom
        right={<Pagination pageInfo={pageInfo} onPageChanged={onPageChanged} />}
      />
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
    onGetStoregeEmployeesList: (storageId, queryData) =>
      dispatch(action.getStoregeEmployeesList(storageId, queryData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageEmployees);
