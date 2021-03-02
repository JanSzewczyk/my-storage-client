import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import * as action from "../../../../store";
import Tile, {
  TileBottom,
  TileContent,
} from "../../../../components/UI/DataDisplay/Tile";
import useQuery, { Query } from "../../../../hooks/useQuery";
import PageInfo from "../../../../shared/types/common/PageInfo";
import Action from "../../../../shared/types/action/Action";
import { StoreDispatch, StoreState } from "../../../../shared/types/store";
import { Employee } from "../../../../shared/types/employee";
import Pagination from "../../../../components/UI/DataDisplay/Pagination";

import "./EmployeeActions.scss";

interface EmployeeActionsProps {
  employee: Employee | null;
  actionList: Action[];
  pageInfo: PageInfo | null;
  actionsListLoading: boolean;
  onGetEmployeeActionList: (employeeId: string, query: Query) => void;
}

const defaultQuery: Query = {
  sort: [{ field: "createdAt", type: "desc" }],
  page: 0,
  size: 30,
};

const EmployeeActions: React.FC<EmployeeActionsProps> = (props) => {
  const {
    employee,
    onGetEmployeeActionList,
    actionList,
    pageInfo,
    actionsListLoading,
  } = props;

  const { query, onPageChanged } = useQuery<Query>(defaultQuery);

  useEffect(() => {
    if (employee) onGetEmployeeActionList(employee.id, query);
  }, [employee, onGetEmployeeActionList, query]);

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Tile
      tileSize={{
        sm: "sm-12",
        md: "md-12",
        lg: "lg-12",
        xl: "xl-6",
      }}
      header={{
        title: "Actions",
      }}
    >
      <TileContent>
        {/* <div className={"employee-actions"}>
          {!actionsListLoading ? (
            <TimeLine>
              {actionList.map((action, index) => (
                <TimeLineItem
                  key={index}
                  date={action.createdAt}
                  // selected={selected === action.id}
                >
                  {action.storageName}
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
        </div> */}
        WORKING in progress ...
      </TileContent>
      <TileBottom
        right={<Pagination pageInfo={pageInfo} onPageChanged={onPageChanged} />}
      />
    </Tile>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    employee: state.employeeStore.employee,
    actionList: state.actionStore.actionList,
    pageInfo: state.actionStore.pageInfo,
    actionsListLoading: state.actionStore.actionsListLoading,
  };
};

const mapDispatchToProps = (dispatch: StoreDispatch) => {
  return {
    onGetEmployeeActionList: (employeeId: string, query: Query) =>
      dispatch(action.getEmployeeActionList(employeeId, query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeActions);
