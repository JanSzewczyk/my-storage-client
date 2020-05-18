import React from "react";
import PropTypes from "prop-types";

import AddBoxIcon from "@material-ui/icons/AddBox";
import Tile from "../../../UI/Tile/Tile";

import "./AddStorageTile.scss";

const AddStorageTile = (props) => {
  return (
    <Tile
      tileSize={{
        sm: "sm-12",
        md: "md-6",
        lg: "lg-3",
        xl: "xl-3",
      }}
    >
      <div className={"add-storage-tile"}>
        <AddBoxIcon className={"add-storage-tile__icon"} />
        <h1>Add new Storage</h1>
      </div>
    </Tile>
  );
};

AddStorageTile.propTypes = {};

export default AddStorageTile;
