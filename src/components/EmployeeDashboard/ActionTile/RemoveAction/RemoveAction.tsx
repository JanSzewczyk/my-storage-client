import React, { useState, useEffect } from "react";
import * as _ from "lodash";

import { connect } from "react-redux";
import * as action from "../../../../store";

import axios from "../../../../shared/config/axios";

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import Button from "../../../UI/Inputs/Button/Button";
import RemoveForm from "./RemoveForm/RemoveForm";
import Loading from "../../../UI/Loading/Loading";

import "./RemoveAction.scss";
import { FixMeLater } from "../../../../shared/types/common/FixMeLater";
import { StoreDispatch, StoreState } from "../../../../shared/types/store";
import Item from "../../../../shared/types/item/Item";
import { TileContent, TileBottom } from "../../../UI/DataDisplay/Tile";

interface RemoveActionProps {
  storageId: string;
  onGetStorageItemList: (storageId: string) => void;
  onClose: () => void;
  itemsList: Item[];
  itemsListLoading: boolean;
}

const RemoveAction: React.FC<RemoveActionProps> = React.memo((props) => {
  const {
    storageId,
    onGetStorageItemList,
    onClose,
    itemsList,
    itemsListLoading,
  } = props;
  const [removeItems, setRemoveItems] = useState<FixMeLater[]>([]);

  useEffect(() => {
    onGetStorageItemList(storageId);
  }, [onGetStorageItemList, storageId]);

  const addToRemoveItems = (data: FixMeLater) => {
    setRemoveItems([...removeItems, data]);
  };

  const onRemoveAction = (removedItems: FixMeLater) => {
    axios
      .post(`actions/remove`, removedItems)
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <Aux>
      <TileContent>
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
                      ?.productName
                  } X${i.amount}`}
                </span>
                <br />
              </Aux>
            ))}
          </div>
        </div>
      </TileContent>
      <TileBottom
        left={<Button onClick={onClose}>close</Button>}
        right={
          <Button
            onClick={() => onRemoveAction(removeItems)}
            color={"warning"}
            disabled={removeItems.length === 0}
          >
            remove
          </Button>
        }
      />
    </Aux>
  );
});

const mapStateToProps = (state: StoreState) => {
  return {
    itemsList: state.itemStore.itemList,
    itemsListLoading: state.itemStore.itemListLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetStorageItemList: (storageId: string) =>
      dispatch(action.getStorageItemList(storageId)),
    // onRemoveAction: (items: FixMeLater) => dispatch(action.removeAction(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveAction);
