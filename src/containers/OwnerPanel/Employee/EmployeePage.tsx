import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";

import * as action from "../../../store";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import AppBar from "../../../components/UI/Layout/AppBar";
import AppContent from "../../../components/UI/Layout/AppContent";
import Breadcrumbs, {
  BreadcrumbItem,
} from "../../../components/UI/Breadcrumbs";
import EmployeeDetails from "./EmployeeDetails/EmployeeDetails";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import EmployeeStorageDetails from "./EmployeeStorageDetails/EmployeeStorageDetails";
import { RouteComponentProps } from "react-router-dom";
import { StoreDispatch, StoreState } from "../../../shared/types/store";
import Employee from "../../../shared/types/employee/Employee";
import EmployeeActions from "./EmployeeActions/EmployeeActions";

interface MatchProps {
  employeeId: string;
  storageId?: string;
}

interface EmployeePageProps extends RouteComponentProps<MatchProps> {
  employee: Employee | null;
  employeeLoading: boolean;
  onInitEmployeeStore: () => void;
  onInitActionStore: () => void;
}

const EmployeePage: React.FC<EmployeePageProps> = (props) => {
  const {
    match,
    employee,
    employeeLoading,
    onInitEmployeeStore,
    onInitActionStore,
  } = props;

  const employeeId = match.params.employeeId;
  const storageId = match.params.storageId;

  useEffect(() => {
    return () => {
      onInitEmployeeStore();
      onInitActionStore();
    };
  }, [onInitActionStore, onInitEmployeeStore]);

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
    // onGetEmployeeActionList: (employeeId: string) =>
    //   dispatch(action.getEmployeeActionList(employeeId)),
    onInitEmployeeStore: () => dispatch(action.initEmployeeStore()),
    onInitActionStore: () => dispatch(action.initActionStore()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(EmployeePage));
