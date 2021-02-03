import React, { useRef } from "react";
import _ from "lodash";

import "./TableSelectHeading.scss";

interface TableSelectHeadingProps<TTable> {
  //   singleSelect: boolean; //TODO Add option
  selected: TTable[];
  data: TTable[];
  onSelectHeadingClick: () => void;
}

const TableSelectHeading = <TTable,>({
  //   singleSelect, //TODO Add option
  selected,
  data,
  onSelectHeadingClick,
}: TableSelectHeadingProps<TTable>) => {
  const differences = _.differenceWith(data, selected, _.isEqual);
  const ref = useRef<HTMLInputElement>(null);

  if (ref.current) {
    ref.current.indeterminate =
      differences.length > 0 && differences.length < data.length;
  }

  return (
    <th className={"table-select-heading"}>
      <div className={"table-select-heading__content"}>
        {/* {!singleSelect && ( */}
          <input
            type="checkbox"
            ref={ref}
            disabled={data.length === 0}
            checked={data.length !== 0 && differences.length === 0}
            onChange={onSelectHeadingClick}
          />
        {/* )} */}
      </div>
    </th>
  );
};

export default TableSelectHeading;
