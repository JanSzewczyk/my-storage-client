import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as _ from "lodash";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import TileContent from "../../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../../UI/Tile/TileBottom/TileBottom";
import Button from "../../../UI/Button/Button";
import RemoveForm from "./RemoveForm/RemoveForm";
import Loading from "../../../UI/Loading/Loading";

import "./RemoveAction.scss";

const RemoveAction = React.memo((props) => {
  const {
    storageId,
    onGetStoregeItemsEmployee,
    onClose,
    itemsList,
    itemsListLoading,
    actionSRLoading,
    onRemoveAction,
  } = props;
  const [removeItems, setRemoveItems] = useState([]);

  useEffect(() => {
    onGetStoregeItemsEmployee(storageId);
  }, [onGetStoregeItemsEmployee, storageId]);

  const addToRemoveItems = (data) => {
    setRemoveItems([...removeItems, data]);
  };

  return (
    <Aux>
      <TileContent>
        {!actionSRLoading ? (
          <div className={"remove-action"}>
            <div className={"remove-action__container"}>
              {itemsListLoading ? (
                <Loading />
              ) : (
                <RemoveForm addItem={addToRemoveItems} items={itemsList} />
              )}
            </div>
            <div className={"remove-action__container"}>
              Items :
              <br />
              {removeItems.map((i, index) => (
                <Aux>
                  <span key={index}>
                    {`* ${
                      _.find(itemsList, (o) => i.productId === o.productId)
                        .productName
                    } X${i.amount}`}
                  </span>
                  <br />
                </Aux>
              ))}
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </TileContent>
      <TileBottom
        left={<Button clicked={onClose}>close</Button>}
        right={
          <Button
            clicked={() => onRemoveAction(removeItems)}
            btnType={"warning"}
            disabled={removeItems.length === 0}
          >
            remove
          </Button>
        }
      />
    </Aux>
  );
});

RemoveAction.propTypes = {
  storageId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    itemsList: state.item.itemsList,
    itemsListLoading: state.item.itemsListLoading,
    actionSRLoading: state.action.actionSRLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStoregeItemsEmployee: (storageId) =>
      dispatch(action.getStoregeItemsEmployee(storageId)),
    onRemoveAction: (items) => dispatch(action.removeAction(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveAction);
