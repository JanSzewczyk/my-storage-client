import React, { ReactNode } from "react";

import "./DataView.scss";

interface DataViewProps {
  label: string;
  data: ReactNode;
}

const DataView: React.FC<DataViewProps> = ({ label, data }) => {
  return (
    <div className={"data-view"}>
      <div className={"data-view__label"}>{label}</div>
      <div className={"data-view__data"}>{data}</div>
    </div>
  );
};

export default DataView;
