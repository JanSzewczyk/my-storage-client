import React, { useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as action from "../../../../store";

import Tile from "../../../UI/Tile/Tile";
import TileContent from "../../../UI/Tile/TileContent/TileContent";
import TileBottom from "../../../UI/Tile/TileBottom/TileBottom";
import useQuery from "../../../../hooks/useQuery";
import Pagination from "../../../UI/Pagination/Pagination";

import Loading from "../../../UI/Loading/Loading";
import TimeLine from "../../../UI/TimeLine/TimeLine";
import TimeLineItem from "../../../UI/TimeLine/TimeLineItem/TimeLineItem";
import ActionTimeLineItem from "./ActionTimeLineItem/ActionTimeLineItem";

import "./StorageActions.scss";

const StorageActions = React.memo((props) => {
  const {
    storageId,
    onGetStorageActionsList,
    actionsList,
    pageInfo,
    actionsListLoading,
  } = props;

  const { query, onPageChanged } = useQuery({
    sort: [{ field: "createdAt", type: "desc" }],
    page: 0,
    size: 30,
  });

  useEffect(() => {
    onGetStorageActionsList(storageId, query);
  }, [onGetStorageActionsList, query, storageId]);

  const [selected, setSelected] = useState(null);

  const actionTimeLine = useMemo(
    () => (
      <TimeLine>
        {actionsList.map((action, index) => (
          <TimeLineItem key={index} date={action.createdAt}>
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

const mapStateToProps = (state) => {
  return {
    actionsList: state.action.actionsList,
    pageInfo: state.action.pageInfo,
    actionsListLoading: state.action.actionsListLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStorageActionsList: (storageId, queryData) =>
      dispatch(action.getStorageActionsList(storageId, queryData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageActions);
