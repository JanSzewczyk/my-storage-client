import React from "react";

import StorageIcon from "@material-ui/icons/Storage";
import Tile from "../../../UI/Tile/Tile";
import Button from "../../../UI/Button/Button";
import TileBottom from "../../../UI/Tile/TileBottom/TileBottom";
import TileContent from "../../../UI/Tile/TileContent/TileContent";

import "./StorageItem.scss";
import { StorageView } from "../../../../shared/types/storage";

interface StorageItemProps {
  storage: StorageView;
  onRedirectToStorage: () => void;
}

// TODO Remove THIS
const StorageItem: React.FC<StorageItemProps> = (props) => {
  const { storage, onRedirectToStorage } = props;

  return (
    <Tile
      tileSize={{
        sm: "sm-3",
        md: "md-3",
        lg: "lg-6",
        xl: "xl-12",
      }}
    >
      <TileContent>
        <div className={"storage-item"}>
          <StorageIcon className={"storage-item__icon"} />
          <div className={"storage-item__container"}>
            <div className={"storage-item__title"}>Storage Name</div>
            <span>{storage.name}</span>
          </div>
          <div className={"storage-item__container"}>
            <div className={"storage-item__title"}>City</div>
            <span>{storage.addressCity}</span>
          </div>
          <div className={"storage-item__container"}>
            <div className={"storage-item__title"}>Country</div>
            <span>{storage.addressCountry}</span>
          </div>
          <div className={"storage-item__container"}>
            <div className={"storage-item__title"}>Surface</div>
            <span>{storage.surface}</span>
          </div>
          <div className={"storage-item__container"}>
            <div className={"storage-item__title"}>Number Of Employees</div>
            <span>{storage.numberOfEmployees}</span>
          </div>
        </div>
      </TileContent>
      <TileBottom
        right={<Button onClick={onRedirectToStorage}>show storage</Button>}
      />
    </Tile>
  );
};

export default StorageItem;
