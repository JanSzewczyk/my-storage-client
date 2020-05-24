import React from "react";
import PropTypes from "prop-types";

import Button from "../../../../Button/Button";

import "./TableActionCell.scss";

const TableActionCell = (props) => {
  const { actions, rowData } = props;

  return (
    <td className="table-action-cell">
      <div className={"table-action-cell__buttons"}>
      {actions.map((action, index) => {
        return (
          <Button key={index} clicked={() => action.action(rowData)}>
            {action.name}
          </Button>
        );
      })}
      </div>
    </td>
  );
};

TableActionCell.propTypes = {
  rowData: PropTypes.object.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
    })
  ),
};

export default TableActionCell;
