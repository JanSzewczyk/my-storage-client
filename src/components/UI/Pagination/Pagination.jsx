import React from "react";
import PropTypes from "prop-types";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import "./Pagination.scss";
import PageChangeItem from "./PageChangeItem/PageChangeItem";
import PaginationItems from "./PaginationItems/PaginationItems";

const Pagination = React.memo((props) => {
  const { pageInfo, onPageChanged } = props;

  return (
    <div className={"pagination"}>
      <PageChangeItem
        active={Boolean(pageInfo) && pageInfo.number > 0}
        clicked={() => onPageChanged(pageInfo.number - 1)}
      >
        <NavigateBeforeIcon fontSize={"large"} />
      </PageChangeItem>

      {pageInfo && (
        <PaginationItems pageInfo={pageInfo} onPageChanged={onPageChanged} />
      )}

      <PageChangeItem
        active={Boolean(pageInfo) && pageInfo.number < pageInfo.totalPages - 1}
        clicked={() => onPageChanged(pageInfo.number + 1)}
      >
        <NavigateNextIcon fontSize={"large"} />
      </PageChangeItem>
    </div>
  );
});

Pagination.propTypes = {
  pageInfo: PropTypes.shape({
    size: PropTypes.number.isRequired,
    totalElements: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
  }),
  onPageChanged: PropTypes.func.isRequired,
};

export default Pagination;
