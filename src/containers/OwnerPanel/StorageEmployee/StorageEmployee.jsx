import React, { useMemo } from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import AppBar from "../../../components/UI/AppBar";
import AppContent from "../../../components/UI/AppContent";
import Breadcrumbs, {
  BreadcrumbItem,
} from "../../../components/UI/Breadcrumbs";
import EmployeeDetails from "../../../components/Employee/EmployeeDetails/EmployeeDetails";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import EmployeeStorageDetails from "../../../components/Employee/EmployeeStorageDetails/EmployeeStorageDetails";

const StorageEmployee = (props) => {
  const { match } = props;

  const employeeId = match.params.employeeId;
  const storageId = match.params.storageId;

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
    () => <EmployeeDetails employeeId={employeeId} />,
    [employeeId]
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
