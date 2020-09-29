import React from "react";

import { Storage } from "../../../shared/types/storage";

import Tile from "../../UI/Tile/Tile";
import TileContent from "../../UI/Tile/TileContent/TileContent";
import DataView from "../../UI/DataView/DataView";
import { dateToDateTimeString } from "../../../shared/utils/dateUtils";
import TileBottom from "../../UI/Tile/TileBottom/TileBottom";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

interface StorageInforamtionsProps {
  storage: Storage;
  onAction: (actionType: "STORE" | "REMOVE") => void;
}

const StorageInforamtions: React.FC<StorageInforamtionsProps> = React.memo(
  (props) => {
    const { storage, onAction } = props;

    return (
      <Tile
        header={{
          title: "Storage",
          subtitle: "Storage informations",
        }}
        tileSize={{
          sm: "sm-12",
          md: "md-6",
          lg: "lg-4",
          xl: "xl-3",
        }}
      >
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
            <Aux>
              <Button btnType={"primary"} onClick={() => onAction("STORE")}>
                STORE
              </Button>
              <Button btnType={"warning"} onClick={() => onAction("REMOVE")}>
                REMOVE
              </Button>
            </Aux>
          }
        />
      </Tile>
    );
  }
);

export default StorageInforamtions;
