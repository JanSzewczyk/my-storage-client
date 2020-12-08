import React, { useMemo } from "react";
import Tile from "../../UI/DataDisplay/Tile";

import RemoveAction from "./RemoveAction/RemoveAction";
import StoreAction from "./StoreAction/StoreAction";

interface ActionTileProps {
  action: "STORE" | "REMOVE" | null;
  onClose: () => void;
  storageId: string;
  ownerId: string;
}

const ActionTile: React.FC<ActionTileProps> = (props) => {
  const { action, onClose, storageId, ownerId } = props;

  const store = useMemo(
    () => <StoreAction ownerId={ownerId} onClose={onClose} />,
    [onClose, ownerId]
  );

  const remove = useMemo(
    () => <RemoveAction storageId={storageId} onClose={onClose} />,
    [onClose, storageId]
  );

  return (
    <Tile
      header={{
        title: `${action} action`,
      }}
      tileSize={{
        sm: "sm-12",
        md: "md-6",
        lg: "lg-6",
        xl: "xl-6",
      }}
    >
      {action === "REMOVE" && remove}
      {action === "STORE" && store}
    </Tile>
  );
};

export default ActionTile;
