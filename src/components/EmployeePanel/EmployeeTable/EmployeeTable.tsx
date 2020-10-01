import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import * as action from "../../../store";

import Tile from "../../UI/Tile/Tile";
import TileContent from "../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../UI/Tile/TileBottom/TileBottom";
import { dateToDateTimeString } from "../../../shared/utils/dateUtils";
import Pagination from "../../UI/Pagination/Pagination";
import TileTop from "../../UI/Tile/TileTop/TileTop";
import Button from "../../UI/Button/Button";
import CUEmployeeModal from "./CUEmployeeModal/CUEmployeeModal";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Table, { TableConfig } from "../../UI/Table";
import useQuery, { SearchQuery } from "../../../hooks/useQuery";

import browserHistory from "../../../shared/config/history";
import Search from "../../UI/Search/Search";
import useNotification from "../../../hooks/useNotification";
import axios from "../../../shared/config/axios";

import "./EmployeeTable.scss";
import StoreState from "../../../shared/types/store/StoreState";
import StoreDispatch from "../../../shared/types/store/StoreDispatch";
import {
  CUEmployee,
  Employee,
  EmployeeDto,
  EmployeeView,
} from "../../../shared/types/employee";
import PageInfo from "../../../shared/types/common/PageInfo";
import { AxiosResponse } from "axios";
import { mapEmployeeDtoToEmployee } from "../../../shared/data-utils/employeeUtils";

interface EmployeeTableProps {
  onGetEmployeesList: (query: SearchQuery) => void;
  employeeList: EmployeeView[];
  employeeListLoading: boolean;
  pageInfo: PageInfo | null;
}

const EmployeeTable: React.FC<EmployeeTableProps> = React.memo((props) => {
  const {
    onGetEmployeesList,
    employeeList,
    employeeListLoading,
    pageInfo,
  } = props;

  const [showModal, setShowModal] = useState<boolean>(false);

  const { query, onSortChanged, onPageChanged, onSearchChanged } = useQuery<
    SearchQuery
  >({
    search: "",
    sort: [],
    page: 0,
    size: 20,
  });

  useEffect(() => {
    onGetEmployeesList(query);
  }, [onGetEmployeesList, query]);

  const config: TableConfig<EmployeeView> = {
    columns: [
      {
        field: "shortId",
        name: "ID",
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
        field: "storageName",
        name: "Workplace",
        sorted: true,
      },
      {
        field: "createdAt",
        name: "Created date",
        sorted: true,
        converter: (cellData: any) => dateToDateTimeString(cellData),
      },
    ],
  };

  const search = useMemo(
    () => (
      <Search onSearchChanged={onSearchChanged} searchString={query.search} />
    ),
    [onSearchChanged, query.search]
  );

  const redirectToEmployee = useCallback((employee) => {
    browserHistory.push(`/employees/${employee.id}`);
  }, []);

  const employeeTable = useMemo(
    () => (
      <Table
        config={config}
        data={employeeList}
        sort={query.sort}
        onSortChanged={onSortChanged}
        loading={employeeListLoading}
        onRowClick={redirectToEmployee}
      />
    ),
    [
      config,
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

  const history = useHistory();
  const notification = useNotification();

  const createEmployee = useCallback(
    (newEmployee: CUEmployee) => {
      axios
        .post(`employees`, newEmployee)
        .then((res: AxiosResponse<EmployeeDto>) => {
          const newEmployee: Employee = mapEmployeeDtoToEmployee(res.data);

          notification.add({
            content: `The employee ${newEmployee.firstName} ${newEmployee.lastName} has been created`,
            type: "success",
          });

          history.push(`/employees/${newEmployee.id}`);
        });
    },
    [history, notification]
  );

  const employeeModal = useMemo(
    () => (
      <CUEmployeeModal
        onCloseModal={() => setShowModal(false)}
        onCreateEmployee={createEmployee}
      />
    ),
    [createEmployee]
  );

  return (
    <Aux>
      {showModal && employeeModal}
      <Tile
        header={{
          title: "Employees",
          subtitle: "Storage information",
        }}
      >
        <TileTop
          left={search}
          right={
            <Button btnType={"primary"} onClick={() => setShowModal(true)}>
              add employee
            </Button>
          }
        />
        <TileContent>
          <div className={"employee-table"}>{employeeTable}</div>
        </TileContent>
        <TileBottom right={pagination} />
      </Tile>
    </Aux>
  );
});

const mapStateToProps = (state: StoreState) => {
  return {
    employeeList: state.employeeStore.employeeViewList,
    pageInfo: state.employeeStore.pageInfo,
    employeeListLoading: state.employeeStore.employeeViewListLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetEmployeesList: (query: SearchQuery) =>
      dispatch(action.getEmployeesList(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTable);
