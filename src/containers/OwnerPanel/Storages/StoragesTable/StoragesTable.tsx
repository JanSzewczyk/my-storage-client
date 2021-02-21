import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import * as action from "../../../../store";
import PageInfo from "../../../../shared/types/common/PageInfo";
import { StorageView } from "../../../../shared/types/storage";
import { StoreDispatch, StoreState } from "../../../../shared/types/store";
import useQuery, { SearchQuery } from "../../../../hooks/useQuery";
import { dateToDateTimeString } from "../../../../shared/utils/dateUtils";

import Search from "../../../../components/UI/Inputs/Search";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import CreateStorageModal from "./CreateStorageModal/CreateStorageModal";
import IconButton from "../../../../components/UI/Inputs/IconButton";
import { PlusIcon } from "../../../../components/UI/DataDisplay/Icons";
import Pagination from "../../../../components/UI/DataDisplay/Pagination";
import Table, {
  TableConfig,
} from "../../../../components/UI/DataDisplay/Table";
import Tile, {
  TileTop,
  TileContent,
  TileBottom,
} from "../../../../components/UI/DataDisplay/Tile";
import Tooltip from "../../../../components/UI/DataDisplay/Tooltip";

import "./StoragesTable.scss";

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
      field: "name",
      name: "Name",
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

  const [showCreateStorageModal, setShowCreateStorageModal] = useState<boolean>(
    false
  );

  useEffect(() => {
    onGetStorageList(query);
  }, [onGetStorageList, query]);

  const redirectToStorage = (storage: StorageView): void => {
    history.push(`storages/${storage.id}`);
  };

  return (
    <Aux>
      {showCreateStorageModal && (
        <CreateStorageModal
          onCloseModal={() => setShowCreateStorageModal(false)}
        />
      )}
      <Tile
        header={{
          title: "Your Storages",
        }}
      >
        <TileTop
          left={
            <Search
              onSearchChanged={onSearchChanged}
              searchString={query.search}
            />
          }
          right={
            <Tooltip
              text={"Add New Storage"}
              position={"top-end"}
              color={"blue"}
            >
              <IconButton onClick={() => setShowCreateStorageModal(true)}>
                <PlusIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <TileContent>
          <div className={"storages-table"}>
            <Table<StorageView>
              config={config}
              data={storageViewList}
              sort={query.sort}
              onSortChanged={onSortChanged}
              onRowClick={redirectToStorage}
              loading={storageViewListLoading}
            />
          </div>
        </TileContent>
        <TileBottom
          right={
            <Pagination pageInfo={pageInfo} onPageChanged={onPageChanged} />
          }
        />
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
