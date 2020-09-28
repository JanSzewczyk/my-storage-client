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

interface EmployeeProps {
  match: any;
}

const Employee: React.FC<EmployeeProps> = (props) => {
  const { match } = props;

  const employeeId: string = match.params.employeeId;

  const breadcrumbs = (
    <Breadcrumbs>
      <BreadcrumbItem text={"Employees"} path={`/employees`} />
      <BreadcrumbItem
        text={"Employee"}
        path={`/employees/${employeeId}`}
        active
      />
    </Breadcrumbs>
  );

  const employeeDetails = useMemo(
    () => <EmployeeDetails employeeId={employeeId} />,
    [employeeId]
  );

  const employeeStorageDetails = useMemo(
    () => <EmployeeStorageDetails employeeId={employeeId} />,
    [employeeId]
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
