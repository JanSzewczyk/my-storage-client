import React, { useMemo } from "react";

import AppContent from "../../../components/UI/AppContent/AppContent";

import withErrorHandler from "../../../hoc/withErrorHandler";
import StoragesTable from "./StoragesTable/StoragesTable";

interface StoragesProps {}

const Storages: React.FC<StoragesProps> = (props) => {
  const storagesTable = useMemo(() => <StoragesTable />, []);

  return <AppContent>{storagesTable}</AppContent>;
};

export default withErrorHandler(Storages);
