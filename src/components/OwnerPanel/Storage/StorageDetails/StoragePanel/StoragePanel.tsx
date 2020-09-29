import React from "react";

import DataView from "../../../../UI/DataView/DataView";
import TileContent from "../../../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../../../UI/Tile/TileBottom/TileBottom";
import Button from "../../../../UI/Button/Button";
import Aux from "../../../../../hoc/Auxiliary/Auxiliary";
import { dateToDateTimeString } from "../../../../../shared/utils/dateUtils";
import { Storage } from "../../../../../shared/types/storage";

interface StoragePanelProps {
  storage: Storage | null;
  onEdit: () => void;
}

const StoragePanel: React.FC<StoragePanelProps> = React.memo((props) => {
  const { storage, onEdit } = props;

  return storage ? (
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
          <Button btnType={"primary"} onClick={onEdit}>
            edit
          </Button>
        }
      />
    </Aux>
  ) : (
    <> No Data </>
  );
});

export default StoragePanel;
