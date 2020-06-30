import React from "react";
import PropTypes from "prop-types";

import TableHeading from "./TableHeading/TableHeading";

const TableHeader = (props) => {
  const { config, sort, onSortChanged } = props;

  const setSortQuery = (field, type) => {
    let sortData = sort;
    sortData = sortData.filter((s) => s.field !== field);
    if (type !== "") {
      sortData.push({ field, type });
    }
    onSortChanged(sortData);
  };

  const getSortIndex = (fieldName) => {
    if (sort.length > 1) {
      for (let i = 0; i < sort.length; i++) {
        if (fieldName === sort[i].field) {
          return i + 1;
        }
      }
    } else {
      return null;
    }
  };

  return (
    <thead>
      <tr>
        {config.columns.map((conf, index) => (
          <TableHeading
            key={index}
            config={conf}
            isSorted={Boolean(onSortChanged) && Boolean(conf.sorted)}
            onSetSortQuery={onSortChanged && setSortQuery}
            sortIndex={getSortIndex(conf.field)}
          />
        ))}
        {config.actions && (
          <TableHeading
            key={"actions"}
            isSorted={false}
            config={{ name: "", field: "actions" }}
          />
        )}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  config: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        sorted: PropTypes.bool,
        converter: PropTypes.func,
      })
    ).isRequired,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        action: PropTypes.func,
      })
    ),
  }).isRequired,
  sort: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ),
  onSortChanged: PropTypes.func,
};

export default TableHeader;
