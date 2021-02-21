import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { AxiosResponse } from "axios";

import { connect } from "react-redux";
import * as action from "../../../../store";

import useQuery, { SearchQuery } from "../../../../hooks/useQuery";
import browserHistory from "../../../../shared/config/history";
import Search from "../../../../components/UI/Inputs/Search/Search";
import useNotification from "../../../../hooks/useNotification";
import axios from "../../../../shared/config/axios";
import {
  CUEmployee,
  Employee,
  EmployeeDto,
  EmployeeView,
} from "../../../../shared/types/employee";
import { StoreDispatch, StoreState } from "../../../../shared/types/store";
import PageInfo from "../../../../shared/types/common/PageInfo";
import { mapEmployeeDtoToEmployee } from "../../../../shared/data-utils/employeeUtils";

import CUEmployeeModal from "../../../../components/OwnerPanel/CUEmployeeModal/CUEmployeeModal";
import { dateToDateTimeString } from "../../../../shared/utils/dateUtils";
import Button from "../../../../components/UI/Inputs/Button/Button";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";

import "./EmployeeTable.scss";
import Pagination from "../../../../components/UI/DataDisplay/Pagination";
import Table, {
  TableConfig,
} from "../../../../components/UI/DataDisplay/Table";
import Tile, {
  TileTop,
  TileContent,
  TileBottom,
} from "../../../../components/UI/DataDisplay/Tile";

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

  const {
    query,
    onSortChanged,
    onPageChanged,
    onSearchChanged,
  } = useQuery<SearchQuery>({
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
        }}
      >
        <TileTop
          left={search}
          right={
            <Button color={"primary"} onClick={() => setShowModal(true)}>
              add employee
            </Button>
          }
        />
        <TileContent>
          <div className={"employee-table"}>
            <Table
              config={config}
              data={employeeList}
              sort={query.sort}
              onSortChanged={onSortChanged}
              loading={employeeListLoading}
              onRowClick={redirectToEmployee}
            />
          </div>
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
