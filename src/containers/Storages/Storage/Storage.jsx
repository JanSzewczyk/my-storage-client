import React, { useMemo } from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import AppBar from "../../../components/UI/AppBar/AppBar";
import AppContent from "../../../components/UI/AppContent/AppContent";
import StorageDetails from "../../../components/Storage/Storage/StorageDetails/StorageDetails";

const Storage = (props) => {
  const storageId = props.match.params.storageId;

  const storageDetails = useMemo(
    () => <StorageDetails storageId={storageId} />,
    [storageId]
  );

  return (
    <Aux>
      <AppBar left={"breadcrumbs"} />
      <AppContent>{storageDetails}</AppContent>
    </Aux>
  );
};

export default Storage;
