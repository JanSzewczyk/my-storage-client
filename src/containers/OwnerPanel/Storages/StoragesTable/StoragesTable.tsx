import React, { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import * as action from "../../../../store";

import PageInfo from "../../../../shared/types/common/PageInfo";
import { StorageView } from "../../../../shared/types/storage";
import { StoreDispatch, StoreState } from "../../../../shared/types/store";
import useQuery, { SearchQuery } from "../../../../hooks/useQuery";

import Table, { TableConfig } from "../../../../components/UI/Table";
import Pagination from "../../../../components/UI/Pagination";
import Tile, {
  TileBottom,
  TileContent,
  TileTop,
} from "../../../../components/UI/Tile";
import Search from "../../../../components/UI/Search";
import { dateToDateTimeString } from "../../../../shared/utils/dateUtils";

interface StoragesTableProps {
  onGetStorageList: (query: SearchQuery) => void;
  storageViewList: StorageView[];
  pageInfo: PageInfo | null;
  storageViewListLoading: boolean;
}

const config: TableConfig<StorageView> = {
  columns: [
    {
      field: "shortId",
      name: "ID",
      sorted: true,
    },
    {
      field: "surface",
      name: "Surface",
      sorted: true,
      converter: (cellData: number) => `${cellData}m^2`,
    },
    {
      field: "numberOfEmployees",
      name: "Employees",
      sorted: true,
    },
    {
      field: "addressCity",
      name: "City",
      sorted: true,
    },
    {
      field: "addressCountry",
      name: "Country",
      sorted: true,
    },
    {
      field: "lastActionDate",
      name: "Last Action",
      sorted: true,
      converter: (cellData: Date) =>
        cellData ? dateToDateTimeString(cellData) : "",
    },
    {
      field: "createdAt",
      name: "Created",
      sorted: true,
      converter: (cellData: Date) => dateToDateTimeString(cellData),
    },
  ],
  actions: [
    {
      action: () => console.log("eloo"),
      name: "eloo",
    },
  ],
};

const StoragesTable: React.FC<StoragesTableProps> = React.memo((props) => {
  const {
    onGetStorageList,
    storageViewList,
    pageInfo,
    storageViewListLoading,
  } = props;

  const history = useHistory();
  const { query, onSortChanged, onPageChanged, onSearchChanged } = useQuery<
    SearchQuery
  >({
    sort: [],
    page: 0,
    size: 20,
    search: "",
  });

  useEffect(() => {
    onGetStorageList(query);
  }, [onGetStorageList, query]);

  const redirectToStorage = useCallback(
    (storage: StorageView) => {
      history.push(`storages/${storage.id}`);
    },
    [history]
  );

  const search = useMemo(
    () => (
      <Search onSearchChanged={onSearchChanged} searchString={query.search} />
    ),
    [onSearchChanged, query.search]
  );

  const table = useMemo(
    () => (
      <Table<StorageView>
        config={config}
        data={storageViewList}
        sort={query.sort}
        onSortChanged={onSortChanged}
        onRowClick={redirectToStorage}
        loading={storageViewListLoading}
      />
    ),
    [
      onSortChanged,
      query.sort,
      redirectToStorage,
      storageViewList,
      storageViewListLoading,
    ]
  );

  const pagination = useMemo(
    () => <Pagination pageInfo={pageInfo} onPageChanged={onPageChanged} />,
    [onPageChanged, pageInfo]
  );

  return (
    <Tile
      header={{
        title: "Your Storages",
        // subtitle: "Employees working in storage",
      }}
    >
      <TileTop
        left={search}
        // right={
        // //   <Button btnType={"primary"} onClick={() => setShowModal(true)}>
        // //     add employee
        // //   </Button>
        // }
      />
      <TileContent>
        <div className={"storage-employees"}>{table}</div>
      </TileContent>
      <TileBottom right={pagination} />
    </Tile>
  );
});

const mapStateToProps = (state: StoreState) => {
  return {
    storageViewList: state.storageStore.storageViewList,
    pageInfo: state.storageStore.pageInfo,
    storageViewListLoading: state.storageStore.storageViewListLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetStorageList: (query: SearchQuery) =>
      dispatch(action.getStorageList(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoragesTable);
