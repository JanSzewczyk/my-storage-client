import React from "react";
import PropTypes from "prop-types";

import DataView from "../../../../UI/DataView/DataView";
import TileContent from "../../../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../../../UI/Tile/TileBottom/TileBottom";
import Button from "../../../../UI/Button/Button";
import Aux from "../../../../../hoc/Auxiliary/Auxiliary";
import { dateToDateTimeString } from "../../../../../shared/utils/dateUtils";

const StoragePanel = React.memo((props) => {
  const { storage, onEdit } = props;
  return (
    <Aux>
      <TileContent>
        <DataView label={"Name:"} data={storage.name} />
        <DataView label={"Surface:"} data={storage.surface} />
        <DataView label={"Street:"} data={storage.addressStreet} />
        <DataView label={"City:"} data={storage.addressCity} />
        <DataView label={"Zip:"} data={storage.addressZip} />
        <DataView label={"Country:"} data={storage.addressCountry} />
        <DataView
          label={"Created At:"}
          data={dateToDateTimeString(storage.createdAt)}
        />
        <DataView
          label={"Updated At:"}
          data={dateToDateTimeString(storage.updatedAt)}
        />
      </TileContent>
      <TileBottom
        right={
          <Button btnType={"primary"} clicked={onEdit}>
            edit
          </Button>
        }
      />
    </Aux>
  );
});

StoragePanel.propTypes = {
  storage: PropTypes.object,
  onEdit: PropTypes.func.isRequired,
};

export default StoragePanel;
