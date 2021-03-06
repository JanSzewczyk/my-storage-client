import React, { useMemo } from "react";

import AppContent from "../../../components/UI/Layout/AppContent/AppContent";

import withErrorHandler from "../../../hoc/withErrorHandler";
import StoragesTable from "./StoragesTable/StoragesTable";

interface StoragesProps {}

const Storages: React.FC<StoragesProps> = () => {
  const storagesTable = useMemo(() => <StoragesTable />, []);

  return <AppContent>{storagesTable}</AppContent>;
};

export default withErrorHandler(Storages);
