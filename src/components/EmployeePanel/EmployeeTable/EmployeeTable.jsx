import React, { useEffect, useState, useMemo, useCallback } from "react";

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
import Table from "../../UI/Table";
import useQuery from "../../../hooks/useQuery";

import "./EmployeeTable.scss";
import browserHistory from "../../../shared/config/history";

const EmployeeTable = React.memo((props) => {
  const {
    onGetEmployeesList,
    employeeList,
    employeeListLoading,
    onRemoveEmployee,
    pageInfo,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(null);

  const { query, onSortChanged, onPageChanged } = useQuery({
    sort: [],
    page: 0,
    size: 20,
  });

  useEffect(() => {
    onGetEmployeesList(query);
  }, [onGetEmployeesList, query]);

  const config = {
    columns: [
      {
        field: "shortId",
        name: "Employee ID",
        sorted: true,
      },
      {
        field: "firstName",
        name: "First Name",
        sorted: true,
      },
      {
        field: "lastName",
        name: "Last Name",
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
        field: "storageName",
        name: "Workplace",
        sorted: true,
      },
      {
        field: "createdAt",
        name: "Created date",
        sorted: true,
        converter: (cellData) => dateToDateTimeString(cellData),
      },
    ],
    actions: [
      {
        name: "delete",
        action: (rowData) => onRemoveEmployee(rowData.employeeId),
      },
      {
        name: "edit",
        action: (rowData) => {
          setEdit(rowData);
          setShowModal(true);
        },
      },
    ],
  };

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

  const employeeModal = useMemo(
    () => (
      <CUEmployeeModal
        onCloseModal={() => {
          setEdit(null);
          setShowModal(false);
        }}
        editEmployee={edit}
      />
    ),
    [edit]
  );

  return (
    <Aux>
      {showModal && employeeModal}
      <Tile
        tileSize={{
          sm: "sm-12",
          md: "md-12",
          lg: "lg-12",
          xl: "xl-12",
        }}
        header={{
          title: "Employees",
          subtitle: "Storage information",
        }}
      >
        <TileTop
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
    onRemoveEmployee: (employeeId) =>
      dispatch(action.removeEmployee(employeeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTable);
