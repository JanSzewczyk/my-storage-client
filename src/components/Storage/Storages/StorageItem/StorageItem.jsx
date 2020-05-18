import React from "react";
import PropTypes from "prop-types";

import StorageIcon from "@material-ui/icons/Storage";
import Tile from "../../../UI/Tile/Tile";
import Button from "../../../UI/Button/Button";

import "./StorageItem.scss";

const StorageItem = (props) => {
  const { storage, onRedirectToStorege } = props;
  console.log(storage);
  // CropDin
  return (
    <Tile
      tileSize={{
        sm: "sm-3",
        md: "md-3",
        lg: "lg-3",
        xl: "xl-3",
      }}
      bottom={{
        right: <Button clicked={onRedirectToStorege}>show storage</Button>,
      }}
    >
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
    </Tile>
  );
};

StorageItem.propTypes = {
  storage: PropTypes.object.isRequired,
  onRedirectToStorege: PropTypes.func.isRequired,
};

export default StorageItem;
