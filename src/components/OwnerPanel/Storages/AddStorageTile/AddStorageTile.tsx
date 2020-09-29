import React from "react";

import AddBoxIcon from "@material-ui/icons/AddBox";
import Tile from "../../../UI/Tile/Tile";
import TileContent from "../../../UI/Tile/TileContent/TileContent";

import "./AddStorageTile.scss";

interface AddStorageTileProps {
  onAddStorage: () => void;
}

const AddStorageTile: React.FC<AddStorageTileProps> = (props) => {
  const { onAddStorage } = props;
  return (
    <Tile
      tileSize={{
        sm: "sm-12",
        md: "md-6",
        lg: "lg-3",
        xl: "xl-3",
      }}
    >
      <TileContent>
        <div className={"add-storage-tile"} onClick={onAddStorage}>
          <AddBoxIcon className={"add-storage-tile__icon"} />
          <h1>Create Storage</h1>
        </div>
      </TileContent>
    </Tile>
  );
};

export default AddStorageTile;
