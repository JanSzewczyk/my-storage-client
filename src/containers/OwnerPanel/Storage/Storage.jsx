import React, { useMemo } from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import AppBar from "../../../components/UI/AppBar";
import AppContent from "../../../components/UI/AppContent";
import StorageDetails from "../../../components/OwnerPanel/Storage/StorageDetails/StorageDetails";
import StorageEmployees from "../../../components/OwnerPanel/Storage/StorageEmployees/StorageEmployees";
import StorageItems from "../../../components/OwnerPanel/Storage/StorageItems/StorageItems";
import StorageActions from "../../../components/OwnerPanel/Storage/StorageActions/StorageActions";
import StorageStatistics from "../../../components/OwnerPanel/Storage/StorageStatistics/StorageStatistics";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Breadcrumbs, {
  BreadcrumbItem,
} from "../../../components/UI/Breadcrumbs";

const Storage = (props) => {
  const { match } = props;

  const storageId = match.params.storageId;

  const breadcrumbs = (
    <Breadcrumbs>
      <BreadcrumbItem text={"Storages"} path={`/storages`} />
      <BreadcrumbItem text={"Storage"} path={`/storages/${storageId}`} active />
    </Breadcrumbs>
  );

  const storageDetails = useMemo(
    () => <StorageDetails storageId={storageId} />,
    [storageId]
  );

  const storageEmployees = useMemo(
    () => <StorageEmployees storageId={storageId} />,
    [storageId]
  );

  const storageItems = useMemo(() => <StorageItems storageId={storageId} />, [
    storageId,
  ]);

  const storageActions = useMemo(
    () => <StorageActions storageId={storageId} />,
    [storageId]
  );

  const storageStatistics = useMemo(
    () => <StorageStatistics storageId={storageId} />,
    [storageId]
  );

  return (
    <Aux>
      <AppBar left={breadcrumbs} />
      <AppContent>
        {storageDetails}
        {storageEmployees}
        {storageItems}
        {storageActions}
        {storageStatistics}
      </AppContent>
    </Aux>
  );
};

export default withErrorHandler(Storage);
