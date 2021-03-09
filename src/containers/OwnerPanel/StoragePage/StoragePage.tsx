import React, { useEffect, useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import * as action from "../../../store";
import { StoreDispatch, StoreState } from "../../../shared/types/store";
import StorageItems from "./StorageItems/StorageItems";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { Storage } from "../../../shared/types/storage";

import Breadcrumbs, {
  BreadcrumbItem,
} from "../../../components/UI/Breadcrumbs";
import StorageActions from "./StorageActions/StorageActions";
import StorageDetails from "./StorageDetails/StorageDetails";
import StorageEmployees from "./StorageEmployees/StorageEmployees";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import AppBar from "../../../components/UI/Layout/AppBar";
import AppContent from "../../../components/UI/Layout/AppContent";
import StorageStatistics from "./StorageStatistics/StorageStatistics";
import Row from "../../../components/UI/Layout/Row";

interface MatchProps {
  storageId: string;
}

interface StorageProps extends RouteComponentProps<MatchProps> {
  storage: Storage | null;
  storageLoading: boolean;
  onGetStorage: (storageId: string) => void;
  onGetStorageStatistics: (storageId: string) => void;

  onInitStorageStore: () => void;
  onInitEmployeeStore: () => void;
  onInitItemStore: () => void;
  onInitActionStore: () => void;
  onInitStatisticStore: () => void;
}

const StoragePage: React.FC<StorageProps> = (props) => {
  const {
    match,
    storage,
    storageLoading,
    onGetStorage,
    onGetStorageStatistics,
    onInitStorageStore,
    onInitEmployeeStore,
    onInitItemStore,
    onInitActionStore,
    onInitStatisticStore,
  } = props;

  const storageId: string = match.params.storageId;

  useEffect(() => {
    onGetStorage(storageId);

    return () => {
      onInitStorageStore();
      onInitEmployeeStore();
      onInitItemStore();
      onInitActionStore();
      onInitStatisticStore();
    };
  }, [
    onGetStorage,
    onInitActionStore,
    onInitEmployeeStore,
    onInitItemStore,
    onInitStatisticStore,
    onInitStorageStore,
    storageId,
  ]);

  useEffect(() => {
    if (storage) {
      onGetStorageStatistics(storage.id);
    }
  }, [onGetStorageStatistics, storage]);

  const breadcrumbs = (
    <Breadcrumbs>
      <BreadcrumbItem text={"Storages"} path={`/storages`} />
      <BreadcrumbItem text={"Storage"} path={`/storages/${storageId}`} active />
    </Breadcrumbs>
  );

  const storageDetails = useMemo(() => <StorageDetails />, []);

  const storageEmployees = useMemo(() => <StorageEmployees />, []);

  const storageItems = useMemo(() => <StorageItems />, []);

  const storageActions = useMemo(() => <StorageActions />, []);

  const storageStatistics = useMemo(() => <StorageStatistics />, []);

  return (
    <Aux>
      <AppBar left={breadcrumbs} />
      {storageLoading ||
        (storage && (
          <AppContent>
            <Row>
              {storageDetails}
              {storageEmployees}
              {storageItems}
              {storageActions}
              {storageStatistics}
            </Row>
          </AppContent>
        ))}
    </Aux>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    storage: state.storageStore.storage,
    storageLoading: state.storageStore.storageLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetStorage: (storageId: string) => dispatch(action.getStorage(storageId)),
    onGetStorageStatistics: (storageId: string) =>
      dispatch(action.getStorageStatistics(storageId)),
    onInitStorageStore: () => dispatch(action.initStorageStore()),
    onInitEmployeeStore: () => dispatch(action.initEmployeeStore()),
    onInitItemStore: () => dispatch(action.initItemStore()),
    onInitActionStore: () => dispatch(action.initActionStore()),
    onInitStatisticStore: () => dispatch(action.initStatisticStore()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(StoragePage));
