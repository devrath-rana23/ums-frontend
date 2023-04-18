import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../../../hooks";
import "./pagination.css";
import ImageUrls from "../../../utils/constants/ImageUrls";

const Pagination = (props) => {
  const { pagination_left_arrow, pagination_right_arrow } = ImageUrls;

  const {
    totalCount,
    siblingCount = 1,
    limit,
    className,
    page,
    currentPageCount,
    onChangePage = () => { },
    onChangePageLimit = () => { },
  } = props;

  const paginationRange = usePagination({
    page,
    totalCount,
    siblingCount,
    limit,
  });

  const onNext = () => {
    onChangePage(page + 1);
  };

  const onPrevious = () => {
    onChangePage(page - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="pagination-container">
      <div className="page-limit-container">
        <select onChange={onChangePageLimit} className="page-limit">
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span className="page-limit-text">
          Showing {currentPageCount} of {totalCount} records
        </span>
      </div>
      <ul
        className={classnames("pagination-nav-container", {
          [className]: className,
        })}
      >
        <img
          className={classnames("pagination-item", {
            disabled: page === 1,
          })}
          onClick={page === 1 ? () => { } : onPrevious}
          src={pagination_left_arrow}
          alt="pagination_left_arrow"
        />
        {paginationRange.map((pageNumber, indexReq) => {
          if (pageNumber === DOTS) {
            return (
              <li key={indexReq} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={indexReq}
              className={classnames("pagination-item", {
                selected: pageNumber === page,
              })}
              onClick={() => onChangePage(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <img
          className={classnames("pagination-item", {
            disabled: page === lastPage,
            borderRight: true,
          })}
          onClick={page === lastPage ? () => { } : onNext}
          src={pagination_right_arrow}
          alt="pagination_right_arrow"
        />
      </ul>
    </div>
  );
};

export default Pagination;
