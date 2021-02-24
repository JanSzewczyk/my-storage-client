import React from "react";
import { Link } from "react-router-dom";

import DataView from "../../UI/DataDisplay/DataView/DataView";
import { Storage } from "../../../shared/types/storage";
import { TileContent } from "../../UI/DataDisplay/Tile";

interface EmployeeStorageDataProps {
  storage: Storage;
}

const EmployeeStorageData: React.FC<EmployeeStorageDataProps> = (props) => {
  const { storage } = props;

  return (
    <TileContent>
      <DataView
        label={"Storage ID:"}
        data={<Link to={`/storages/${storage.id}`}>{storage.shortId}</Link>}
      />
      <DataView label={"Name:"} data={storage.name} />
      <DataView label={"Surface:"} data={storage.surface} />
      <DataView label={"Address Street:"} data={storage.addressStreet} />
      <DataView label={"Address Zip:"} data={storage.addressZip} />
      <DataView label={"Address City:"} data={storage.addressCity} />
      <DataView label={"Address Country:"} data={storage.addressCountry} />
    </TileContent>
  );
};

export default EmployeeStorageData;
