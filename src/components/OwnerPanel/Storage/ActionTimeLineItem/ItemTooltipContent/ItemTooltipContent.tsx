import React from "react";

import Item from "../../../../../shared/types/item/Item";

import "./ItemTooltipContent.scss";

interface ItemTooltipContentProps {
  item: Item;
}

const ItemTooltipContent: React.FC<ItemTooltipContentProps> = ({ item }) => {
  return (
    <div className={"item-tooltip-content"}>
      <span className={"item-tooltip-content__name"}>{item.productName}</span>
      <div className={"item-tooltip-content__details"}>
        {item.productDescription}
      </div>
    </div>
  );
};

export default ItemTooltipContent;
