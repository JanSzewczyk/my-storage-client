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
import TileTop from "../../UI/Tile/TileTop/TileTop";
import Button from "../../UI/Button/Button";
import CUEmployeeModal from "./CUEmployeeModal/CUEmployeeModal";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import "./EmployeeTable.scss";

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

  const config = {
    columns: [
      {
        field: "firstName",
        name: "First Name",
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
    [config, employeeList, employeeListLoading, onSortChanged, query.sort]
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
        editEmlpoyee={edit}
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
          subtitle: "Storage informations",
        }}
      >
        <TileTop
          right={
            <Button btnType={"primary"} clicked={() => setShowModal(true)}>
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
