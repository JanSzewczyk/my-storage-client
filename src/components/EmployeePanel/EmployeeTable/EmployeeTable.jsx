import React, { useEffect, useState, useMemo, useCallback } from "react";

import { connect } from "react-redux";
import * as action from "../../../store";

import Tile from "../../UI/Tile/Tile";
import TileContent from "../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../UI/Tile/TileBottom/TileBottom";
import { updateObject } from "../../../shared/utils/utility";
import Table from "../../UI/Table/Table";
import { dateToDateTimeString } from "../../../shared/utils/dateUtils";
import Pagination from "../../UI/Pagination/Pagination";

import "./EmployeeTable.scss";

const config = {
  columns: [
    {
      field: "firstName",
      name: "First name",
    },
    {
      field: "lastName",
      name: "Last Name",
    },
    {
      field: "phone",
      name: "Phone Number",
    },
    {
      field: "addressStreet",
      name: "Street",
    },
    {
      field: "addressZip",
      name: "Zip",
    },
    {
      field: "addressCity",
      name: "City",
    },
    {
      field: "addressCountry",
      name: "Country",
    },
    {
      field: "storageName",
      name: "Storage",
    },
    {
      field: "createdAt",
      name: "Add date",
      converter: (cellData) => dateToDateTimeString(cellData),
    },
  ],
  actions: [
    {
      name: "delete",
      action: (rowData) => console.log(`Delete ${rowData.first}`),
    },
    {
      name: "edit",
      action: (rowData) => console.log(`Edit ${rowData.first}`),
    },
  ],
};

const EmployeeTable = React.memo((props) => {
  const {
    onGetEmployeesList,
    employeeList,
    employeeListLoading,
    pageInfo,
  } = props;

  const [query, setQuery] = useState({
    sort: [],
    page: 0,
    size: 20,
  });

  useEffect(() => {
    onGetEmployeesList(query);
  }, [onGetEmployeesList, query]);

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

  const employeeTable = useMemo(
    () => (
      <Table
        config={config}
        data={employeeList}
        sort={query.sort}
        onSortChanged={onSortChanged}
        loading={employeeListLoading}
      />
    ),
    [employeeList, employeeListLoading, onSortChanged, query.sort]
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
        lg: "lg-12",
        xl: "xl-12",
      }}
      header={{
        title: "Employees",
        subtitle: "Storage informations",
      }}
    >
      <TileContent>
        <div className={"employee-table"}>{employeeTable}</div>
      </TileContent>
      <TileBottom right={pagination} />
    </Tile>
  );
});

const mapStateToProps = (state) => {
  return {
    employeeList: state.employee.employeeList,
    pageInfo: state.employee.pageInfo,
    employeeListLoading: state.employee.employeeListLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetEmployeesList: (queryData) =>
      dispatch(action.getEmployeesList(queryData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTable);
