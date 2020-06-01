import React, { useMemo } from "react";
import AppContent from "../../components/UI/AppContent/AppContent";
import EmployeeTable from "../../components/EmployeePanel/EmployeeTable/EmployeeTable";

const EmployeePanel = (props) => {

  const storageItems = useMemo(() => <EmployeeTable />, []);

  return <AppContent>{storageItems}</AppContent>;
};

export default EmployeePanel;
