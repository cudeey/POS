import React from "react";

const Pagination = ({ activePage, onPageChange, itemsPerPage, totalItems }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNumber) => (
      <li key={pageNumber}>
        <a
          href="#"
          onClick={() => handlePageClick(pageNumber)}
          className={`flex items-center justify-center px-3 h-8 leading-tight ${
            activePage === pageNumber
              ? "bg-light-orange text-white rounded-full"
              : ""
          }`}
        >
          {pageNumber}
        </a>
      </li>
    ));
  };

  return (
    <ul className="flex items-center justify-center -space-x-px h-8 text-gray-color text-base font-medium mb-5 mt-7">
      {renderPageNumbers()}
    </ul>
  );
};

export default Pagination;
