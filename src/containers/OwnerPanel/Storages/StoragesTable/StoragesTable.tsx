import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

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
import Button from "../../../../components/UI/Button";
import Tooltip from "../../../../components/UI/Tooltip";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import CreateStorageModal from "./CreateStorageModal/CreateStorageModal";
import IconButton from "../../../../components/UI/IconButton";

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
      converter: (cellData: number) => `${cellData} m²`,
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
};

const StoragesTable: React.FC<StoragesTableProps> = React.memo((props) => {
  const {
    onGetStorageList,
    storageViewList,
    pageInfo,
    storageViewListLoading,
  } = props;

  const [showCreateStorageModal, setShowCreateStorageModal] = useState<boolean>(
    false
  );

  const history = useHistory();

  const {
    query,
    onSortChanged,
    onPageChanged,
    onSearchChanged,
  } = useQuery<SearchQuery>({
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

  const createStorageModal = useMemo(
    () => (
      <CreateStorageModal
        onCloseModal={() => setShowCreateStorageModal(false)}
      />
    ),
    []
  );

  return (
    <Aux>
      {showCreateStorageModal && createStorageModal}
      <Tile
        header={{
          title: "Your Storages",
        }}
      >
        <TileTop
          left={search}
          right={
            // <Tooltip
            //   text={"Add New Storage"}
            //   position={"top-end"}
            //   color={"blue"}
            // >
            <IconButton
              // btnType={"icon"}
              
              onClick={() => setShowCreateStorageModal(true)}
            >
              <FaPlus />
            </IconButton>
            // </Tooltip>
          }
        />
        <TileContent>
          <div className={"storage-employees"}>{table}</div>
        </TileContent>
        <TileBottom right={pagination} />
      </Tile>
    </Aux>
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
