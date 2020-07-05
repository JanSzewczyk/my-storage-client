import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import "./TableHeading.scss";

const TableHeading = (props) => {
  const { config, sortIndex, onSetSortQuery, isSorted, sortState } = props;

  const states = ["", "desc", "asc"];

  const getNextState = (actualState) => {
    let nextState = actualState;
    actualState < states.length - 1 ? (nextState += 1) : (nextState = 0);
    return nextState;
  };

  const changeHeadingSortHandler = () => {
    if (isSorted) {
      const newIndex = getNextState(_.indexOf(states, sortState));
      onSetSortQuery(config.field, states[newIndex]);
    }
  };

  let icon = null;
  switch (_.indexOf(states, sortState)) {
    case 0:
      icon = <UnfoldMoreIcon />;
      break;
    case 1:
      icon = <KeyboardArrowDownIcon />;
      break;
    case 2:
      icon = <KeyboardArrowUpIcon />;
      break;
    default:
      break;
  }

  return (
    <th
      onClick={changeHeadingSortHandler}
      className="table-heading"
      style={{
        cursor: isSorted && "pointer",
      }}
    >
      <div className="table-heading__content">
        {config.name}
        {isSorted && (
          <div className="table-heading__sort-wrapper">
            {sortIndex && <span>{`${sortIndex}`}</span>}
            {icon}
          </div>
        )}
      </div>
    </th>
  );
};

TableHeading.propTypes = {
  config: PropTypes.shape({
    field: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sorted: PropTypes.bool,
    converter: PropTypes.func,
  }).isRequired,
  isSorted: PropTypes.bool.isRequired,
  sortIndex: PropTypes.number,
  onSetSortQuery: PropTypes.func,
  sortState: PropTypes.string.isRequired,
};

export default TableHeading;
