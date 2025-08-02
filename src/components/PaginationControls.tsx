interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  function getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
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

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center gap-2 justify-center py-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`h-9 px-3 py-1 rounded border text-black disabled:opacity-60 ${
          page === 1 ? "" : "cursor-pointer"
        }`}
      >
        &lt; Previous
      </button>
      {pageNumbers.map((n, idx) =>
        typeof n === "number" ? (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            className={`w-9 h-9 rounded transition cursor-pointer
              ${
                n === page
                  ? "bg-gray-800 text-white font-bold shadow"
                  : "bg-white border text-black hover:bg-gray-200"
              }
            `}
            aria-current={n === page ? "page" : undefined}
          >
            {n}
          </button>
        ) : (
          <span
            key={"el-" + idx}
            className="w-8 text-center text-gray-400 select-none"
          >
            …
          </span>
        )
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`h-9 px-3 py-1 rounded border text-black disabled:opacity-60 ${
          page === totalPages ? "" : "cursor-pointer"
        }`}
      >
        Next &gt;
      </button>
    </div>
  );
}
