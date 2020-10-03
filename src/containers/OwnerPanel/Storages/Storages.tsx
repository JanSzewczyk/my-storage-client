import React, { useMemo, useState } from "react";

import AppContent from "../../../components/UI/AppContent/AppContent";

import CreateStorageModal from "../../../components/OwnerPanel/Storages/CreateStorageModal/CreateStorageModal";
import withErrorHandler from "../../../hoc/withErrorHandler";
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
      {storagesTable}
    </AppContent>
  );
};

export default withErrorHandler(Storages);
