import React, { useMemo } from "react";
import PropTypes from "prop-types";

import Tile from "../../UI/Tile/Tile";
import RemoveAction from "./RemoveAction/RemoveAction";

const ActionTile = (props) => {
  const { action, onClose, storageId } = props;

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
    </Tile>
  );
};

ActionTile.propTypes = {
  action: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  storageId: PropTypes.string,
};

export default ActionTile;
