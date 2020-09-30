import React, { useMemo, useState } from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import AppContent from "../../../components/UI/AppContent/AppContent";

import CreateStorageModal from "../../../components/OwnerPanel/Storages/CreateStorageModal/CreateStorageModal";
import withErrorHandler from "../../../hoc/withErrorHandler";
import AppBar from "../../../components/UI/AppBar";
import StoragesTable from "./StoragesTable/StoragesTable";

interface StoragesProps {}

const Storages: React.FC<StoragesProps> = (props) => {
  const [showAddStorage, setShowAddStorage] = useState<boolean>(false);

  const storagesTable = useMemo(() => <StoragesTable />, []);

  const createStorageModal = useMemo(
    () => <CreateStorageModal onCloseModal={() => setShowAddStorage(false)} />,
    []
  );

  return (
    <AppContent>
      {/* {showAddStorage && createStorageModal}
        {storageViewListLoading ? (
          <Loading />
        ) : (
          <Aux>
            {storageItems}
            <AddStorageTile onAddStorage={() => setShowAddStorage(true)} />
          </Aux>
        )} */}

      {storagesTable}
    </AppContent>
  );
};

export default withErrorHandler(Storages);
