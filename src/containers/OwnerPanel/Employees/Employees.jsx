import React, { useMemo } from "react";
import AppContent from "../../../components/UI/AppContent/AppContent";
import EmployeeTable from "../../../components/EmployeePanel/EmployeeTable/EmployeeTable";

const Employees = (props) => {

  const employeeTable = useMemo(() => <EmployeeTable />, []);

  return <AppContent>{employeeTable}</AppContent>;
};

export default Employees;
