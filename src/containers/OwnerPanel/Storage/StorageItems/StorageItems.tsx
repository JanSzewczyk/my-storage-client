import React, { useMemo, useEffect } from "react";

import { connect } from "react-redux";
import * as action from "../../../../store";

import PageInfo from "../../../../shared/types/common/PageInfo";
import ItemView from "../../../../shared/types/item/ItemView";
import { StoreDispatch, StoreState } from "../../../../shared/types/store";
import useQuery, { Query } from "../../../../hooks/useQuery";
import { formatMoney } from "../../../../shared/utils/currencyUtils";


import "./StorageItems.scss";
import Table, { TableConfig } from "../../../../components/UI/DataDisplay/Table";
import Pagination from "../../../../components/UI/DataDisplay/Pagination";
import Tile, { TileBottom, TileContent } from "../../../../components/UI/DataDisplay/Tile";

interface StorageItemsProps {
  storageId: string;
  onGetStorageItemViewList: (storageId: string, query: Query) => void;
  itemsList: ItemView[];
  pageInfo: PageInfo | null;
  itemsListLoading: boolean;
}

const config: TableConfig<ItemView> = {
  columns: [
    {
      field: "productName",
      name: "Name",
      sorted: true,
    },
    {
      field: "amount",
      name: "Amount",
      sorted: true,
    },
    {
      field: "value",
      name: "Value",
      sorted: true,
      converter: (value: number, rowData: ItemView) =>
        formatMoney(value, rowData.currency),
    },
    {
      field: "totalValue",
      name: "Total Value",
      sorted: true,
      converter: (totalValue: number, rowData: ItemView) =>
        formatMoney(totalValue, rowData.currency),
    },
  ],
};

const StorageItems: React.FC<StorageItemsProps> = React.memo((props) => {
  const {
    storageId,
    onGetStorageItemViewList,
    itemsList,
    pageInfo,
    itemsListLoading,
  } = props;

  const { query, onSortChanged, onPageChanged } = useQuery({
    sort: [],
    page: 0,
    size: 20,
  });

  useEffect(() => {
    onGetStorageItemViewList(storageId, query);
  }, [onGetStorageItemViewList, query, storageId]);

  const itemsTable = useMemo(
    () => (
      <Table<ItemView>
        config={config}
        data={itemsList}
        sort={query.sort}
        onSortChanged={onSortChanged}
        loading={itemsListLoading}
        fontSize={14}
      />
    ),
    [itemsList, itemsListLoading, onSortChanged, query.sort]
  );

  const pagination = useMemo(
    () => <Pagination pageInfo={pageInfo} onPageChanged={onPageChanged} />,
    [onPageChanged, pageInfo]
  );

  return (
    <Tile
      tileSize={{
        sm: "sm-12",
        md: "md-12",
        lg: "lg-6",
        xl: "xl-6",
      }}
      header={{
        title: "Items",
        subtitle: "Items in stock",
      }}
    >
      <TileContent>
        <div className={"storage-items"}>{itemsTable}</div>
      </TileContent>
      <TileBottom right={pagination} />
    </Tile>
  );
});

const mapStateToProps = (state: StoreState) => {
  return {
    itemsList: state.itemStore.itemViewList,
    pageInfo: state.itemStore.pageInfo,
    itemsListLoading: state.itemStore.itemViewListLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetStorageItemViewList: (storageId: string, query: Query) =>
      dispatch(action.getStorageItemViewList(storageId, query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageItems);
