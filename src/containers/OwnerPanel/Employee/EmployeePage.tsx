import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import * as action from "../../../store";
import Breadcrumbs, {
  BreadcrumbItem,
} from "../../../components/UI/Breadcrumbs";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { StoreDispatch, StoreState } from "../../../shared/types/store";
import Employee from "../../../shared/types/employee/Employee";

import EmployeeActions from "./EmployeeActions/EmployeeActions";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import AppBar from "../../../components/UI/Layout/AppBar";
import EmployeeStorageDetails from "./EmployeeStorageDetails/EmployeeStorageDetails";
import AppContent from "../../../components/UI/Layout/AppContent";
import EmployeeDetails from "./EmployeeDetails/EmployeeDetails";

interface MatchProps {
  employeeId: string;
  storageId?: string;
}

interface EmployeePageProps extends RouteComponentProps<MatchProps> {
  employee: Employee | null;
  employeeLoading: boolean;
  onGetEmployee: (employeeId: string) => void;
  onInitEmployeeStore: () => void;
  onInitActionStore: () => void;
}

const EmployeePage: React.FC<EmployeePageProps> = (props) => {
  const {
    match,
    employee,
    employeeLoading,
    onGetEmployee,
    onInitEmployeeStore,
    onInitActionStore,
  } = props;

  const employeeId = match.params.employeeId;
  const storageId = match.params.storageId;

  useEffect(() => {
    onGetEmployee(employeeId);

    return () => {
      onInitEmployeeStore();
      onInitActionStore();
    };
  }, [employeeId, onGetEmployee, onInitActionStore, onInitEmployeeStore]);

  const breadcrumbs = !storageId ? (
    <Breadcrumbs>
      <BreadcrumbItem text={"Employees"} path={`/employees`} />
      <BreadcrumbItem
        text={"Employee"}
        path={`/employees/${employeeId}`}
        active
      />
    </Breadcrumbs>
  ) : (
    <Breadcrumbs>
      <BreadcrumbItem text={"Storages"} path={`/storages`} />
      <BreadcrumbItem text={"Storage"} path={`/storages/${storageId}`} />
      <BreadcrumbItem
        text={"Employee"}
        path={`/storages/${storageId}/employee/${employeeId}`}
        active
      />
    </Breadcrumbs>
  );

  const employeeDetails = useMemo(
    () => <EmployeeDetails employeeId={employeeId} storageId={storageId} />,
    [employeeId, storageId]
  );

  const employeeStorageDetails = useMemo(
    () => (
      <EmployeeStorageDetails employeeId={employeeId} storageId={storageId} />
    ),
    [employeeId, storageId]
  );

  const employeeActions = useMemo(() => <EmployeeActions />, []);

  return (
    <Aux>
      <AppBar left={breadcrumbs} />
      {(employee || employeeLoading) && (
        <AppContent>
          {employeeDetails}
          {employeeStorageDetails}
          {employeeActions}
        </AppContent>
      )}
    </Aux>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    employee: state.employeeStore.employee,
    employeeLoading: state.employeeStore.employeeLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetEmployee: (employeeId: string) =>
      dispatch(action.getEmployee(employeeId)),
    onInitEmployeeStore: () => dispatch(action.initEmployeeStore()),
    onInitActionStore: () => dispatch(action.initActionStore()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(EmployeePage));
