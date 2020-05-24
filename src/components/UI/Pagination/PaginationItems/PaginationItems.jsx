import React from "react";
import PropTypes from "prop-types";

import PaginationItem from "./PaginationItem/PaginationItem";

import "./PaginationItems.scss";

const PaginationItems = (props) => {
  const { pageInfo, onPageChanged } = props;

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
        active={i + start === props.pageInfo.number}
        clicked={() => onPageChanged(i + start)}
      >
        {i + start + 1}
      </PaginationItem>
    ));
  };

  return <ul className={"pagination-items"}>{tableNavItem()}</ul>;
};

PaginationItems.propTypes = {
  pageInfo: PropTypes.shape({
    size: PropTypes.number.isRequired,
    totalElements: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
  }),
  onPageChanged: PropTypes.func.isRequired,
};

export default PaginationItems;
