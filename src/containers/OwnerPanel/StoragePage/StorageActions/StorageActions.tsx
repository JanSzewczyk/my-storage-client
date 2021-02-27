import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import * as action from "../../../../store";
import { StoreDispatch, StoreState } from "../../../../shared/types/store";
import Action from "../../../../shared/types/action/Action";
import PageInfo from "../../../../shared/types/common/PageInfo";
import useQuery, { Query } from "../../../../hooks/useQuery";
import { Storage } from "../../../../shared/types/storage";

import TimeLine, {
  TimeLineItem,
} from "../../../../components/UI/DataDisplay/TimeLine";
import ActionTimeLineItem from "../../../../components/OwnerPanel/Storage/ActionTimeLineItem/ActionTimeLineItem";
import Loading from "../../../../components/UI/Loading";
import Pagination from "../../../../components/UI/DataDisplay/Pagination";
import Tile, {
  TileContent,
  TileBottom,
} from "../../../../components/UI/DataDisplay/Tile";

import "./StorageActions.scss";

interface StorageActionsProps {
  storage: Storage | null;
  onGetStorageActionList: (storageId: string, query: Query) => void;
  actionList: Action[];
  pageInfo: PageInfo | null;
  actionsListLoading: boolean;
}

const StorageActions: React.FC<StorageActionsProps> = (props) => {
  const {
    storage,
    onGetStorageActionList,
    actionList,
    pageInfo,
    actionsListLoading,
  } = props;

  const { query, onPageChanged } = useQuery<Query>({
    sort: [{ field: "createdAt", type: "desc" }],
    page: 0,
    size: 30,
  });

  useEffect(() => {
    if (storage) onGetStorageActionList(storage.id, query);
  }, [onGetStorageActionList, query, storage]);

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Tile
      tileSize={{
        sm: "sm-12",
        md: "md-12",
        lg: "lg-6",
        xl: "xl-6",
      }}
      header={{
        title: "Actions",
      }}
    >
      <TileContent>
        <div className={"storage-actions"}>
          {!actionsListLoading ? (
            <TimeLine>
              {actionList.map((action, index) => (
                <TimeLineItem
                  key={index}
                  date={action.createdAt}
                  selected={selected === action.id}
                >
                  <ActionTimeLineItem
                    action={action}
                    selected={selected === action.id}
                    onSelect={
                      selected !== action.id
                        ? () => setSelected(action.id)
                        : () => setSelected(null)
                    }
                  />
                </TimeLineItem>
              ))}
            </TimeLine>
          ) : (
            <Loading />
          )}
        </div>
      </TileContent>
      <TileBottom
        right={<Pagination pageInfo={pageInfo} onPageChanged={onPageChanged} />}
      />
    </Tile>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    storage: state.storageStore.storage,
    actionList: state.actionStore.actionList,
    pageInfo: state.actionStore.pageInfo,
    actionsListLoading: state.actionStore.actionsListLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetStorageActionList: (storageId: string, query: Query) =>
      dispatch(action.getStorageActionList(storageId, query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageActions);
