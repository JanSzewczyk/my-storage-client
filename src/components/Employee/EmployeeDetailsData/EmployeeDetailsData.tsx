import React from "react";

import { dateToDateTimeString } from "../../../shared/utils/dateUtils";
import Employee from "../../../shared/types/employee/Employee";

import DataView from "../../UI/DataDisplay/DataView/DataView";
import Mailto from "../../UI/DataDisplay/Mailto/Mailto";
import { TileContent } from "../../UI/DataDisplay/Tile";

interface EmployeeDetailsDataProps {
  employee: Employee;
}

const EmployeeDetailsData: React.FC<EmployeeDetailsDataProps> = ({
  employee,
}) => {
  return (
    <TileContent>
      <DataView label={"Employee ID:"} data={employee.shortId} />
      <DataView label={"First Name:"} data={employee.firstName} />
      <DataView label={"Last Name:"} data={employee.lastName} />
      <DataView
        label={"Email:"}
        data={<Mailto email={employee.email}>{employee.email}</Mailto>}
      />
      <DataView label={"Phone:"} data={employee.phone} />
      <DataView label={"Address Street:"} data={employee.addressStreet} />
      <DataView label={"Address City:"} data={employee.addressCity} />
      <DataView label={"Address Zip:"} data={employee.addressZip} />
      <DataView label={"Address Country:"} data={employee.addressCountry} />
      <DataView
        label={"createdAt:"}
        data={dateToDateTimeString(employee.createdAt)}
      />
    </TileContent>
  );
};

export default EmployeeDetailsData;
