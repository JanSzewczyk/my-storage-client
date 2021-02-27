import React, { useState, useEffect } from "react";

import _ from "lodash";

import { connect } from "react-redux";
import * as action from "../../../../store";

import axios from "../../../../shared/config/axios";

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import Button from "../../../UI/Inputs/Button/Button";
import Loading from "../../../UI/Loading/Loading";
import StoreForm from "./StoreForm/StoreForm";

import "./StoreAction.scss";
import { StoreDispatch, StoreState } from "../../../../shared/types/store";
import { FixMeLater } from "../../../../shared/types/common/FixMeLater";
import Product from "../../../../shared/types/product/Product";
import { TileContent, TileBottom } from "../../../UI/DataDisplay/Tile";

interface StoreActionProps {
  ownerId: string;
  onClose: () => void;
  productsListLoading: boolean;
  onGetProductsList: (ownerId: string) => void;
  productsList: Product[];
}

const StoreAction: React.FC<StoreActionProps> = React.memo((props) => {
  const {
    ownerId,
    onClose,
    productsListLoading,
    onGetProductsList,
    productsList,
  } = props;

  const [storeItems, setStoreItems] = useState<FixMeLater[]>([]);

  useEffect(() => {
    onGetProductsList(ownerId);
  }, [onGetProductsList, ownerId]);

  const addToStoreItems = (data: FixMeLater) => {
    setStoreItems([...storeItems, data]);
  };

  const onStoreAction = (storedItems: FixMeLater[]) => {
    axios
      .post(`actions/store`, storedItems)
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <Aux>
      <TileContent>
        <div className={"store-action"}>
          <div className={"store-action__container"}>
            {productsListLoading ? (
              <Loading />
            ) : (
              <StoreForm addItem={addToStoreItems} products={productsList} />
            )}
          </div>
          <div className={"store-action__container"}>
            Items :
            <br />
            {storeItems.map((i, index) => (
              <Aux>
                <span key={index}>
                  {`* ${
                    _.find(
                      productsList,
                      (o: FixMeLater) => i.productId === o.productId
                    )?.name
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
            onClick={() => onStoreAction(storeItems)}
            color={"primary"}
            disabled={storeItems.length === 0}
          >
            store
          </Button>
        }
      />
    </Aux>
  );
});

const mapStateToProps = (state: StoreState) => {
  return {
    productsList: state.productStore.productList,
    productsListLoading: state.productStore.productListLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetProductsList: (ownerId: string) =>
      dispatch(action.getProductsList(ownerId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StoreAction);
