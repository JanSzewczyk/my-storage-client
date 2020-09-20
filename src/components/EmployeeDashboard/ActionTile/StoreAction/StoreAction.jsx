import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as _ from "lodash";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import TileContent from "../../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../../UI/Tile/TileBottom/TileBottom";
import Button from "../../../UI/Button/Button";
import Loading from "../../../UI/Loading/Loading";
import StoreForm from "./StoreForm/StoreForm";

import "./StoreAction.scss";

const StoreAction = React.memo((props) => {
  const {
    ownerId,
    onClose,
    productsListLoading,
    onGetProductsList,
    productsList,
    actionSRLoading,
    onStoreAction,
  } = props;

  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    onGetProductsList(ownerId);
  }, [onGetProductsList, ownerId]);

  const addToStoreItems = (data) => {
    setStoreItems([...storeItems, data]);
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
                      _.find(productsList, (o) => i.productId === o.productId)
                        .name
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
            btnType={"primary"}
            disabled={storeItems.length === 0}
          >
            store
          </Button>
        }
      />
    </Aux>
  );
});

StoreAction.propTypes = {
  storageId: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    productsList: state.productStore.productList,
    productsListLoading: state.productStore.productListLoading,
    actionSRLoading: state.action.actionSRLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProductsList: (ownerId) => dispatch(action.getProductsList(ownerId)),
    onStoreAction: (items) => dispatch(action.storeAction(items)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StoreAction);
