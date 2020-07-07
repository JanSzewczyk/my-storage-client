import React from "react";
import PropTypes from "prop-types";

import TableHeader from "./TableHeader/TableHeader";
import TableBody from "./TableBody/TableBody";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Loading from "../Loading/Loading";

import "./Table.scss";

const Table = React.memo((props) => {
  const { config, sort, onSortChanged, data, onRowClick, loading } = props;
  return (
    <Aux>
      <table className={"table"}>
        <TableHeader
          config={config}
          sort={sort}
          onSortChanged={onSortChanged}
        />
        {!loading && (
          <TableBody config={config} data={data} onRowClick={onRowClick} />
        )}
      </table>
      {loading && <Loading />}
    </Aux>
  );
});

Table.propTypes = {
  tableClass: PropTypes.string,
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
        action: PropTypes.func.isRequired,
      })
    ),
  }).isRequired,
  sort: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSortChanged: PropTypes.func,
  onRowClick: PropTypes.func,
  loading: PropTypes.bool,
  data: PropTypes.array.isRequired,
};

Table.defaultProps = {
  data: [],
  sort: [],
};

export default Table;
