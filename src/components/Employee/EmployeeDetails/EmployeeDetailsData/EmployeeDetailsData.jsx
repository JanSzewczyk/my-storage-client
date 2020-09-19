import React from "react";
import PropTypes from "prop-types";

import TileContent from "../../../UI/Tile/TileContent/TileContent";
import DataView from "../../../UI/DataView/DataView";
import { dateToDateTimeString } from "../../../../shared/utils/dateUtils";
import Mailto from "../../../UI/Mailto/Mailto";

const EmployeeDetailsData = (props) => {
  const { employee } = props;

  return employee ? (
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
  ) : (
    <>No data</>
  );
};

EmployeeDetailsData.propTypes = {
  employee: PropTypes.object.isRequired,
};

export default EmployeeDetailsData;
