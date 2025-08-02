import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(page: number, totalPages: number): (number | string)[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | string)[] = [];
  if (page <= 4) {
    pages.push(1, 2, 3, 4, 5, "...", totalPages);
  } else if (page >= totalPages - 3) {
    pages.push(
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  } else {
    pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
  }
  return pages;
}

export default function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <nav aria-label="Pagination" className="py-6">
      <div className="hidden sm:flex flex-wrap justify-center gap-1 items-center">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="h-9 px-3 py-1 rounded border text-gray-500 disabled:opacity-40 hover:bg-gray-100 transition flex items-center gap-1"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
          <span className="sr-only sm:not-sr-only cursor-pointer">
            Previous
          </span>
        </button>

        {pageNumbers.map((n, idx) =>
          typeof n === "number" ? (
            <button
              key={n}
              onClick={() => onPageChange(n)}
              aria-current={n === page ? "page" : undefined}
              className={`w-9 h-9 rounded flex items-center justify-center text-sm font-semibold transition cursor-pointer
                ${
                  n === page
                    ? "bg-gray-800 text-white shadow"
                    : "bg-white border text-gray-700 hover:bg-gray-100"
                }`}
            >
              {n}
            </button>
          ) : (
            <span
              key={`ellipsis-${idx}`}
              className="w-7 flex items-center justify-center text-gray-400 select-none"
              aria-hidden="true"
            >
              &hellip;
            </span>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="h-9 px-3 py-1 rounded border text-gray-500 disabled:opacity-40 hover:bg-gray-100 transition flex items-center gap-1 cursor-pointer"
          aria-label="Next page"
        >
          <span className="sr-only sm:not-sr-only">Next</span>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Minimal pagination bar for mobile (below sm) */}
      <div className="flex sm:hidden justify-center gap-1 items-center">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="h-9 px-2 py-1 rounded border text-gray-500 disabled:opacity-40 hover:bg-gray-100 transition flex items-center gap-1"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className={`w-9 h-9 rounded flex items-center justify-center text-sm font-semibold transition cursor-pointer border ${
            page === 1
              ? "bg-gray-800 text-white shadow border-gray-800"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="First page"
        >
          1
        </button>

        <span
          className="w-9 h-9 rounded flex items-center justify-center text-sm font-semibold bg-gray-800 text-white shadow border border-gray-800"
          aria-current="page"
        >
          {page}
        </span>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          className={`w-9 h-9 rounded flex items-center justify-center text-sm font-semibold transition cursor-pointer border ${
            page === totalPages
              ? "bg-gray-800 text-white shadow border-gray-800"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Last page"
        >
          {totalPages}
        </button>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="h-9 px-2 py-1 rounded border text-gray-500 disabled:opacity-40 hover:bg-gray-100 transition flex items-center gap-1"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  );
}
