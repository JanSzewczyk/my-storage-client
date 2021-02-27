import React from "react";

import PageInfo from "../../../../shared/types/common/PageInfo";

import PageChangeItem from "./PageChangeItem/PageChangeItem";
import PaginationItems from "./PaginationItems/PaginationItems";
import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";

import "./Pagination.scss";

interface PaginationProps {
  pageInfo: PageInfo | null;
  onPageChanged: (index: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageInfo, onPageChanged }) => {
  const beforePageActive: boolean = pageInfo !== null && pageInfo.number > 0;

  const nextPageActive: boolean =
    pageInfo !== null && pageInfo.number < pageInfo.totalPages - 1;

  return (
    <div className={"pagination"}>
      <PageChangeItem
        active={beforePageActive}
        clicked={
          pageInfo && beforePageActive
            ? () => onPageChanged(pageInfo.number - 1)
            : undefined
        }
      >
        <ChevronLeftIcon fontSize={"large"} />
      </PageChangeItem>

      {pageInfo && (
        <PaginationItems pageInfo={pageInfo} onPageChanged={onPageChanged} />
      )}

      <PageChangeItem
        active={nextPageActive}
        clicked={
          pageInfo && nextPageActive
            ? () => onPageChanged(pageInfo.number + 1)
            : undefined
        }
      >
        <ChevronRightIcon fontSize={"large"} />
      </PageChangeItem>
    </div>
  );
};

export default Pagination;
