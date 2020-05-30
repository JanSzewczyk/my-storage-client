import React, { useMemo } from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import AppBar from "../../../components/UI/AppBar/AppBar";
import AppContent from "../../../components/UI/AppContent/AppContent";
import StorageDetails from "../../../components/Storage/Storage/StorageDetails/StorageDetails";
import StorageEmployees from "../../../components/Storage/Storage/StorageEmployees/StorageEmployees";
import StorageItems from "../../../components/Storage/Storage/StorageItems/StorageItems";

const StorageOwner = (props) => {
  const storageId = props.match.params.storageId;

  const storageDetails = useMemo(
    () => <StorageDetails storageId={storageId} />,
    [storageId]
  );

  const employees = useMemo(() => <StorageEmployees storageId={storageId} />, [
    storageId,
  ]);

  const storageItems = useMemo(() => <StorageItems storageId={storageId} />, [
    storageId,
  ]);

  return (
    <Aux>
      <AppBar left={"breadcrumbs"} />
      <AppContent>
        {storageDetails}
        {employees}
        {storageItems}
      </AppContent>
    </Aux>
  );
};

export default StorageOwner;
