import React from "react";

import { dateToDateTimeString } from "../../../../shared/utils/dateUtils";
import { Storage } from "../../../../shared/types/storage";

import DataView from "../../../UI/DataDisplay/DataView/DataView";
import TileContent from "../../../UI/Tile/TileContent/TileContent";

interface StorageDataProps {
  storage: Storage | null;
}

const StorageData: React.FC<StorageDataProps> = (props) => {
  const { storage } = props;

  return storage ? (
    <TileContent>
      <DataView label={"Name:"} data={storage.name} />
      <DataView label={"Surface:"} data={`${storage.surface} m²`} />
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
  ) : (
    <> No Data </>
  );
};

export default StorageData;
