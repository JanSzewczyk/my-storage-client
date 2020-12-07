import React, { useMemo } from "react";

import AppContent from "../../../components/UI/Layout/AppContent/AppContent";
import EmployeeTable from "./EmployeeTable/EmployeeTable";

interface EmployeesProps {}

const Employees: React.FC<EmployeesProps> = (props) => {
  const employeeTable = useMemo(() => <EmployeeTable />, []);

  return <AppContent>{employeeTable}</AppContent>;
};

export default Employees;
