import React, { useEffect } from "react";
import _ from "lodash";

import { useDispatch } from "react-redux";

const Pagination = ({ count, pageSize, currentPage, onPageChange }) => {
  const dispatch = useDispatch();

  const pgCount = Math.ceil(count / pageSize);
  const pages = _.range(1, pgCount+1);

     
    return(
    <div className="my-4">
      <div className="flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item disabled">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 pointer-events-none focus:shadow-none"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Previous
              </a>
            </li>
            {pages.map((page) => (
              <li key={page} className="page-item">
                <a
                  onClick={() => onPageChange(page)}
                  className={
                    page === currentPage
                      ? "page-link relative block py-1.5 px-3 border-0 bg-red-600 outline-none transition-all duration-300 rounded-full text-white hover:text-white hover:bg-red-600 shadow-md focus:shadow-md"
                      : "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-white hover:bg-red-600 focus:shadow-none"
                  }
                >
                  {page}
                </a>
              </li>
            ))}
            <li className="page-item disabled">
              <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 pointer-events-none focus:shadow-none"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
             Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
    

export default Pagination;