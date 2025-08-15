import React, { useState } from "react";
import Event from "./Event";
import './Pagination.css'; // ensure your pagination styles are here

const EventList = ({ events = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 32;
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = events.slice(indexOfFirst, indexOfLast);

  // Helper to build a limited page list with ellipses
  const siblingCount = 1; // pages to show on each side of current
  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  let paginationRange = [];
  if (totalPages <= 5) {
    paginationRange = range(1, totalPages);
  } else {
    const left = Math.max(1, currentPage - siblingCount);
    const right = Math.min(totalPages, currentPage + siblingCount);

    // show first
    if (left > 1) paginationRange.push(1);
    // left ellipse
    if (left > 2) paginationRange.push('...');
    // middle range
    paginationRange.push(...range(left, right));
    // right ellipse
    if (right < totalPages - 1) paginationRange.push('...');
    // show last
    if (right < totalPages) paginationRange.push(totalPages);
  }

  return (
    <>
      <ul id="event-list">
        {currentEvents.map(evt => (
          <Event key={evt.id} event={evt} />
        ))}
      </ul>

      {totalPages > 1 && (
        <nav className="pagination-nav">
          <ul className="pagination">
            {/* Previous button */}
            <li>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </li>

            {/* Page numbers */}
            {paginationRange.map((page, idx) => (
              <li key={idx} className={page === currentPage ? 'active' : ''}>
                {page === '...' ? (
                  <span className="ellipsis">{page}</span>
                ) : (
                  <button onClick={() => setCurrentPage(page)}>
                    {page}
                  </button>
                )}
              </li>
            ))}

            {/* Next button */}
            <li>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default EventList;
