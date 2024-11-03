import "./paginationStyles.scss";
import React, { ChangeEventHandler, useCallback } from "react";
import Image from "next/image";
interface PaginationProps {
  totalResults: number;
  onPageChange: (page: number) => void;
  currentPage?: number;
  handleRowsPerPageChange: any;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  totalResults,
  onPageChange,
  currentPage = 1,
  rowsPerPage,
  handleRowsPerPageChange,
  rowsPerPageOptions,
}) => {
  const totalPages = Math.ceil(totalResults / rowsPerPage);
  const startResult = (currentPage - 1) * rowsPerPage + 1;
  const endResult = Math.min(currentPage * rowsPerPage, totalResults);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Always show the first page
    pageNumbers.push(
      <button
        key={1}
        className={`pagination-number-button ${
          currentPage === 1 ? "active" : ""
        }`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
    );

    // Determine if we need ellipses for the beginning
    if (currentPage > 3) {
      pageNumbers.push(
        <span key="start-ellipsis" className="pagination-number-button">
          ...
        </span>
      );
    }

    // Show the current page and up to one page before and after it
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(
          <button
            key={i}
            className={`pagination-number-button ${
              currentPage === i ? "active" : ""
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    }

    // Determine if we need ellipses for the end
    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span key="end-ellipsis" className="pagination-number-button">
          ...
        </span>
      );
    }

    // Always show the last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          className={`pagination-number-button ${
            currentPage === totalPages ? "active" : ""
          }`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={"pagination  container"}>
      <div className="flex-display gap-medium justify-center align-center align-center gap-large grey-text">
        <p>Showing</p>
        <label>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              handleRowsPerPageChange(e.target.value);
            }}
            className={"pagination-select"}
          >
            {rowsPerPageOptions?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <p>100</p>
      </div>
      <div className={"btn_wrapper"}>
        <button
          className={`page-button one ${currentPage === 1 && "fade"}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Image
            src={"/images/icons/arrow-right.svg"}
            alt="arrow-left"
            width={14}
            height={14}
          ></Image>
        </button>
        {renderPageNumbers()}
        <button
          className={`page-button ${currentPage === totalPages && "fade"}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Image
            src={"/images/icons/arrow-right.svg"}
            alt="arrow-left"
            width={14}
            height={14}
          ></Image>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
