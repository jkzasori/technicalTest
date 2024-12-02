import React, { useState, useEffect } from "react";
import "./styles.css";

/**
 * Props for the `Paginator` component.
 *
 * @template T - The type of the data items being paginated.
 */
interface PaginatorProps<T> {
  /**
   * The data items to be paginated.
   */
  data: T[];

  /**
   * Default number of items to display per page.
   * @default 10
   */
  defaultPageSize?: number;

  /**
   * The total number of data items.
   */
  totalData: number;

  /**
   * The current active page (1-indexed).
   */
  currentPage: number;

  /**
   * Callback function triggered when the current page changes.
   *
   * @param currentPage - The newly selected page.
   */
  onPageChange?: (currentPage: number) => void;
}

/**
 * A reusable pagination component for handling large datasets.
 *
 * @template T - The type of the data items being paginated.
 *
 * @param {PaginatorProps<T>} props - The properties for configuring the paginator.
 * @returns {JSX.Element} The rendered pagination component.
 *
 * @example
 * ```tsx
 * const data = Array.from({ length: 100 }, (_, i) => i + 1); // Example dataset
 * const [currentPage, setCurrentPage] = useState(1);
 *
 * const handlePageChange = (page: number) => {
 *   console.log("Current Page:", page);
 *   setCurrentPage(page);
 * };
 *
 * return (
 *   <Paginator
 *     data={data}
 *     totalData={data.length}
 *     defaultPageSize={10}
 *     currentPage={currentPage}
 *     onPageChange={handlePageChange}
 *   />
 * );
 * ```
 */
const Paginator = <T,>({
  defaultPageSize = 10,
  totalData,
  onPageChange,
  currentPage,
}: PaginatorProps<T>): JSX.Element => {
  // Local state for managing the currently active page
  const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);

  // Sync local state with external `currentPage` prop when it changes
  useEffect(() => {
    setLocalCurrentPage(currentPage);
  }, [currentPage]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalData / defaultPageSize);

  /**
   * Handles changes to the current page.
   *
   * @param newPage - The new page number to navigate to.
   */
  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setLocalCurrentPage(newPage);
      onPageChange?.(newPage); // Trigger the callback if provided
    }
  };

  /**
   * Renders the pagination buttons.
   *
   * Includes logic to handle dynamic display of page ranges with ellipses (`...`).
   *
   * @returns {JSX.Element[]} An array of JSX buttons for pagination.
   */
  const renderPageButtons = () => {
    const buttons: JSX.Element[] = [];
    const maxVisibleButtons = 5; // Maximum visible page buttons

    // Calculate the range of pages to display
    let leftBoundary = Math.max(1, localCurrentPage - Math.floor(maxVisibleButtons / 2));
    let rightBoundary = Math.min(totalPages, leftBoundary + maxVisibleButtons - 1);

    // Adjust boundaries if reaching the start or end
    if (rightBoundary - leftBoundary < maxVisibleButtons - 1) {
      leftBoundary = Math.max(1, rightBoundary - maxVisibleButtons + 1);
    }

    // Generate buttons for the calculated range
    for (let i = leftBoundary; i <= rightBoundary; i++) {
      buttons.push(
        <button
          key={i}
          className={`pageLink ${i === localCurrentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Add "..." buttons for skipped ranges
    if (leftBoundary > 1) {
      buttons.unshift(
        <button key="dots-left" className="dots" disabled>
          ...
        </button>
      );
      buttons.unshift(
        <button key="first" className="pageLink" onClick={() => handlePageChange(1)}>
          1
        </button>
      );
    }

    if (rightBoundary < totalPages) {
      buttons.push(
        <button key="dots-right" className="dots" disabled>
          ...
        </button>
      );
      buttons.push(
        <button key="last" className="pageLink" onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="paginator">
      <button
        className="pageLink"
        onClick={() => handlePageChange(localCurrentPage - 1)}
        disabled={localCurrentPage === 1}
        aria-label="Previous Page"
      >
        {"← Previous"}
      </button>
      {renderPageButtons()}
      <button
        className="pageLink"
        onClick={() => handlePageChange(localCurrentPage + 1)}
        disabled={localCurrentPage === totalPages}
        aria-label="Next Page"
      >
        {"Next →"}
      </button>
    </div>
  );
};

export default Paginator;
