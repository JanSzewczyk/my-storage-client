import React, { useMemo } from "react";
import PropTypes from "prop-types";

import Tile from "../../UI/Tile/Tile";
import RemoveAction from "./RemoveAction/RemoveAction";
import StoreAction from "./StoreAction/StoreAction";

const ActionTile = (props) => {
  const { action, onClose, storageId, ownerId } = props;

  const store = useMemo(
    () => (
      <StoreAction storageId={storageId} ownerId={ownerId} onClose={onClose} />
    ),
    [onClose, ownerId, storageId]
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

ActionTile.propTypes = {
  action: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  ownerId: PropTypes.string.isRequired,
  storageId: PropTypes.string,
};

export default ActionTile;
