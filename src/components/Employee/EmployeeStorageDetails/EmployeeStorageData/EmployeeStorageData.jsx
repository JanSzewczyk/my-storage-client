import React from "react";
import PropTypes from "prop-types";
import TileContent from "../../../UI/Tile/TileContent/TileContent";
import DataView from "../../../UI/DataView/DataView";
import { Link } from "react-router-dom";

const EmployeeStorageData = (props) => {
  const { storage } = props;

  return (
      <TileContent>
        <DataView label={"Storage ID:"} data={<Link to={`/storages/${storage.id}`}>{storage.shortId}</Link>} />
        <DataView
          label={"Name:"}
          data={storage.name}
        />
        <DataView label={"Surface:"} data={storage.surface} />
        <DataView label={"Address Street:"} data={storage.addressStreet} />
        <DataView label={"Address Zip:"} data={storage.addressZip} />
        <DataView label={"Address City:"} data={storage.addressCity} />
        <DataView label={"Address Country:"} data={storage.addressCountry} />
      </TileContent>
  );
};

EmployeeStorageData.propTypes = {
  storage: PropTypes.object.isRequired,
};

export default EmployeeStorageData;
