import React, { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../../store";

import { StoreDispatch, StoreState } from "../../../../shared/types/store";
import Action from "../../../../shared/types/action/Action";
import PageInfo from "../../../../shared/types/common/PageInfo";
import useQuery, { Query } from "../../../../hooks/useQuery";

import TimeLine, { TimeLineItem } from "../../../../components/UI/DataDisplay/TimeLine";
import ActionTimeLineItem from "../../../../components/OwnerPanel/Storage/ActionTimeLineItem/ActionTimeLineItem";
import Loading from "../../../../components/UI/Loading";

import "./StorageActions.scss";
import Pagination from "../../../../components/UI/DataDisplay/Pagination";
import Tile, { TileContent, TileBottom } from "../../../../components/UI/DataDisplay/Tile";

interface StorageActionsProps {
  storageId: string;
  onGetStorageActionsList: (storageId: string, query: Query) => void;
  actionsList: Action[];
  pageInfo: PageInfo | null;
  actionsListLoading: boolean;
}

const StorageActions: React.FC<StorageActionsProps> = React.memo((props) => {
  const {
    storageId,
    onGetStorageActionsList,
    actionsList,
    pageInfo,
    actionsListLoading,
  } = props;

  const { query, onPageChanged } = useQuery<Query>({
    sort: [{ field: "createdAt", type: "desc" }],
    page: 0,
    size: 30,
  });

  useEffect(() => {
    onGetStorageActionsList(storageId, query);
  }, [onGetStorageActionsList, query, storageId]);

  const [selected, setSelected] = useState<string | null>(null);

  const actionTimeLine = useMemo(
    () => (
      <TimeLine>
        {actionsList.map((action, index) => (
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
    ),
    [actionsList, selected]
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
        title: "Actions",
      }}
    >
      <TileContent>
        <div className={"storage-actions"}>
          {!actionsListLoading ? actionTimeLine : <Loading />}
        </div>
      </TileContent>
      <TileBottom right={pagination} />
    </Tile>
  );
});

StorageActions.propTypes = { storageId: PropTypes.string.isRequired };

const mapStateToProps = (state: StoreState) => {
  return {
    actionsList: state.actionStore.actionsList,
    pageInfo: state.actionStore.pageInfo,
    actionsListLoading: state.actionStore.actionsListLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetStorageActionsList: (storageId: string, query: Query) =>
      dispatch(action.getStorageActionsList(storageId, query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageActions);
