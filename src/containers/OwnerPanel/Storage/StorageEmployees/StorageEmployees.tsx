import React, { useCallback, useEffect, useMemo } from "react";

import { connect } from "react-redux";
import * as action from "../../../../store";

import useQuery, { Query } from "../../../../hooks/useQuery";
import browserHistory from "../../../../shared/config/history";
import { EmployeeView } from "../../../../shared/types/employee";
import PageInfo from "../../../../shared/types/common/PageInfo";
import { StoreDispatch, StoreState } from "../../../../shared/types/store";


import "./StorageEmployees.scss";
import Pagination from "../../../../components/UI/DataDisplay/Pagination";
import Table, { TableConfig } from "../../../../components/UI/DataDisplay/Table";
import Tile, { TileContent, TileBottom } from "../../../../components/UI/DataDisplay/Tile";

interface StorageEmployeesProps {
  storageId: string;
  onGetStorageEmployeesList: (storageId: string, queryData: Query) => void;
  employeeList: EmployeeView[];
  pageInfo: PageInfo | null;
  employeeListLoading: boolean;
}

const config: TableConfig<EmployeeView> = {
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
      field: "email",
      name: "Email",
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
  ],
};

const StorageEmployees: React.FC<StorageEmployeesProps> = React.memo(
  (props) => {
    const {
      storageId,
      onGetStorageEmployeesList,
      employeeList,
      pageInfo,
      employeeListLoading,
    } = props;

    const { query, onSortChanged, onPageChanged } = useQuery<Query>({
      sort: [],
      page: 0,
      size: 20,
    });

    useEffect(() => {
      onGetStorageEmployeesList(storageId, query);
    }, [onGetStorageEmployeesList, query, storageId]);

    const redirectToEmployee = useCallback(
      (employee: EmployeeView) => {
        browserHistory.push(`/storages/${storageId}/employee/${employee.id}`);
      },
      [storageId]
    );

    const table = useMemo(
      () => (
        <Table<EmployeeView>
          config={config}
          data={employeeList}
          sort={query.sort}
          onSortChanged={onSortChanged}
          onRowClick={redirectToEmployee}
          loading={employeeListLoading}
          fontSize={14}
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
          md: "md-12",
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
  }
);

const mapStateToProps = (state: StoreState) => {
  return {
    employeeList: state.employeeStore.employeeViewList,
    pageInfo: state.employeeStore.pageInfo,
    employeeListLoading: state.employeeStore.employeeViewListLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetStorageEmployeesList: (storageId: string, queryData: Query) =>
      dispatch(action.getStorageEmployeesList(storageId, queryData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageEmployees);
