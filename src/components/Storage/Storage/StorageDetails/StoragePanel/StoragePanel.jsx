import React from "react";
import PropTypes from "prop-types";
import DataView from "../../../../UI/DataView/DataView";

const StoragePanel = (props) => {
  const { storage } = props;
  return (
    <div>
      <DataView label={"Name:"} data={storage.name} />
      <DataView label={"Surface:"} data={storage.surface} />
      <DataView label={"Street:"} data={storage.addressStreet} />
      <DataView label={"City:"} data={storage.addressCity} />
      <DataView label={"Zip:"} data={storage.addressZip} />
      <DataView label={"Country:"} data={storage.addressCountry} />
      <DataView
        label={"Created At:"}
        data={storage.createdAt.toLocaleString()}
      />
      <DataView
        label={"Updated At:"}
        data={storage.updatedAt.toLocaleString()}
      />
    </div>
  );
};

StoragePanel.propTypes = {
  storage: PropTypes.object.isRequired,
};

export default StoragePanel;
