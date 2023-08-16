import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, moviesPerPage, totalMovies, onPageChange }) => {
    const totalPages = Math.ceil(totalMovies / moviesPerPage);
  
    const handlePageClick = (page) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    };
  
    return (
      <ul className="pagination-list">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <li
            key={page}
            className={`pagination-item ${page === currentPage ? 'active' : ''}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    );
  };

 export default Pagination;