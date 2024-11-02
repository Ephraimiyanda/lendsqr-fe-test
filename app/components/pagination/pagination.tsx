import Style from "./pagination.module.scss";
import React from "react";
import Image from "next/image";
interface PaginationProps {
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages: number;
  currentPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalResults,
  resultsPerPage,
  onPageChange,
  maxVisiblePages,
  currentPage = 1,
}) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  const getPageNumbers = () => {
    const pageNumbers: (number | null)[] = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push(null); // Add ellipsis if there are skipped pages before the startPage
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(null); // Add ellipsis if there are skipped pages after the endPage
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
    onPageChange(page);
  };

  return (
    <div className={Style.pagination_container}>
      <div>
        <p>
          Showing {startResult}-{endResult} of {totalResults} results
        </p>
      </div>
      <div className={Style.pagination_btn_wrapper}>
        <button
          className={Style.btn_prev}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Image
            src={"/images/icons/arrow-left.svg"}
            alt="arrow-left"
            width={14}
            height={14}
          ></Image>
        </button>
        {getPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            className={
              pageNumber === currentPage ? Style.active : Style.btn_paginate
            }
            onClick={() => handlePageClick(pageNumber as number)}
            disabled={pageNumber === null}
          >
            {pageNumber === null ? "..." : pageNumber}
          </button>
        ))}
        <button
          className={Style.btn_nxt}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
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
