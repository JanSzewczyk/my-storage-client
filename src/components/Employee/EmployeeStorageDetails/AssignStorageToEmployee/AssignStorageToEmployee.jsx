import React from "react";
import PropTypes from "prop-types";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import { TileContent, TileBottom } from "../../../UI/Tile";
import Button from "../../../UI/Button";

const AssignStorageToEmployee = React.memo((props) => {
  const { employeeId, onClose } = props;

  return (
    <Aux>
      <TileContent></TileContent>
      <TileBottom
        right={
          <Aux>
            <Button onClick={onClose}>Cancel</Button>
            <Button btnType={"primary"}>Save</Button>
          </Aux>
        }
      />
    </Aux>
  );
});

AssignStorageToEmployee.propTypes = {
  employeeId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AssignStorageToEmployee;
