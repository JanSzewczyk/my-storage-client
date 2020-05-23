import React from "react";
import PropTypes from "prop-types";

import AddBoxIcon from "@material-ui/icons/AddBox";
import Tile from "../../../UI/Tile/Tile";

import "./AddStorageTile.scss";

const AddStorageTile = (props) => {
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
      <div className={"add-storage-tile"} onClick={onAddStorage}>
        <AddBoxIcon className={"add-storage-tile__icon"} />
        <h1>Create Storage</h1>
      </div>
    </Tile>
  );
};

AddStorageTile.propTypes = {
  onAddStorage: PropTypes.func.isRequired,
};

export default AddStorageTile;
