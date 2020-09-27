import React from "react";

import PaginationItem from "./PaginationItem/PaginationItem";

import "./PaginationItems.scss";
import PageInfo from "../../../../shared/types/common/PageInfo";

interface PaginationItemsProps {
  pageInfo: PageInfo;
  onPageChanged: (index: number) => void;
}

const PaginationItems: React.FC<PaginationItemsProps> = ({
  pageInfo,
  onPageChanged,
}) => {
  const tableNavItem = () => {
    let count = 11;
    const auxCount = (count - 1) / 2;
    let start = 0;
    if (pageInfo.totalPages < count) {
      count = pageInfo.totalPages;
    } else {
      if (
        pageInfo.number > auxCount &&
        pageInfo.number + auxCount < pageInfo.totalPages
      ) {
        start = pageInfo.number - auxCount;
      } else if (pageInfo.totalPages < pageInfo.number + 1 + auxCount) {
        start = pageInfo.totalPages - count;
      }
    }

    if (!pageInfo.totalPages) count = 0;

    return Array.from(Array(count).keys()).map((i) => (
      <PaginationItem
        key={i + start}
        active={i + start === pageInfo.number}
        clicked={() => onPageChanged(i + start)}
      >
        {i + start + 1}
      </PaginationItem>
    ));
  };

  return <ul className={"pagination-items"}>{tableNavItem()}</ul>;
};

export default PaginationItems;
