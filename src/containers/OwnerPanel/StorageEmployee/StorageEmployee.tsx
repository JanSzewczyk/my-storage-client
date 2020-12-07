import React, { useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import AppBar from "../../../components/UI/Layout/AppBar";
import AppContent from "../../../components/UI/Layout/AppContent";
import Breadcrumbs, {
  BreadcrumbItem,
} from "../../../components/UI/Breadcrumbs";
import EmployeeDetails from "../../../components/Employee/EmployeeDetails/EmployeeDetails";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import EmployeeStorageDetails from "../../../components/Employee/EmployeeStorageDetails/EmployeeStorageDetails";

interface MatchParams {
  employeeId: string;
  storageId: string;
}

interface StorageEmployeeProps extends RouteComponentProps<MatchParams> {}

const StorageEmployee: React.FC<StorageEmployeeProps> = (props) => {
  const { match } = props;

  const employeeId: string = match.params.employeeId;
  const storageId: string = match.params.storageId;

  const breadcrumbs = (
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

export default withErrorHandler(StorageEmployee);
