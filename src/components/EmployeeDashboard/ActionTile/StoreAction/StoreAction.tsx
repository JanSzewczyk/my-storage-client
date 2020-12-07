import React, { useState, useEffect } from "react";

import _ from "lodash";

import { connect } from "react-redux";
import * as action from "../../../../store";

import axios from "../../../../shared/config/axios";

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import TileContent from "../../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../../UI/Tile/TileBottom/TileBottom";
import Button from "../../../UI/Inputs/Button/Button";
import Loading from "../../../UI/Loading/Loading";
import StoreForm from "./StoreForm/StoreForm";

import "./StoreAction.scss";
import { StoreDispatch, StoreState } from "../../../../shared/types/store";
import { FixMeLater } from "../../../../shared/types/common/FixMeLater";
import Product from "../../../../shared/types/product/Product";

interface StoreActionProps {
  ownerId: string;
  onClose: () => void;
  productsListLoading: boolean;
  onGetProductsList: (ownerId: string) => void;
  productsList: Product[];
  actionSRLoading: boolean;
}

const StoreAction: React.FC<StoreActionProps> = React.memo((props) => {
  const {
    ownerId,
    onClose,
    productsListLoading,
    onGetProductsList,
    productsList,
    actionSRLoading,
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
        {!actionSRLoading ? (
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
        ) : (
          <Loading />
        )}
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
    actionSRLoading: state.actionStore.actionSRLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetProductsList: (ownerId: string) =>
      dispatch(action.getProductsList(ownerId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StoreAction);
