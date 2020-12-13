import React, { useMemo } from "react";

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

interface MatchProps {
  employeeId: string;
  storageId?: string;
}

interface EmployeeProps extends RouteComponentProps<MatchProps> {}

const Employee: React.FC<EmployeeProps> = (props) => {
  const { match } = props;

  const employeeId = match.params.employeeId;
  const storageId = match.params.storageId;

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

  return (
    <Aux>
      <AppBar left={breadcrumbs} />
      <AppContent>
        {employeeDetails}
        {employeeStorageDetails}
      </AppContent>
    </Aux>
  );
};

export default withErrorHandler(Employee);
