import React, {useEffect} from "react";
import Pagination from "react-bootstrap/Pagination";
import PropTypes from "prop-types";

const CustomPagination = ({ pageNo, currentPage, setCurrentPage, alwaysShown = true }) => {
  const changePage = (number) => {
    if (currentPage === number) return;
    setCurrentPage(number);
  };

  const onPageNumberClick = (pageNumber) => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    changePage(currentPage - 1);
  };

  const onNextPageClick = () => {
    changePage(currentPage + 1);
  };

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      setCurrentPage(pagesCount);
    }
  };

  const pagesCount = pageNo;
  const isPaginationShown = alwaysShown ? true : pagesCount > 1;
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  useEffect(setLastPageAsCurrent, [setCurrentPage, pagesCount, currentPage]);

  let isPageNumberOutOfRange;

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers = Math.abs(pageNumber - currentPage) <= 2;

    if (isPageNumberFirst || isPageNumberLast || isCurrentPageWithinTwoPageNumbers) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} className="muted" />;
    }

    return null;
  });

  return (
    <>
      {isPaginationShown && (
        <Pagination>
          <Pagination.Prev onClick={onPreviousPageClick} disabled={isCurrentPageFirst} />
          {pageNumbers}
          <Pagination.Next onClick={onNextPageClick} disabled={isCurrentPageLast} />
        </Pagination>
      )}
    </>
  );
};

CustomPagination.propTypes = {
  pageNo: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  alwaysShown: PropTypes.bool,
};

export default CustomPagination;