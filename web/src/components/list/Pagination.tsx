import React from "react";

interface PaginationProps {
  page: number;
  pages: number;
  limit: number;
  onPageChange: (p: number) => void;
  onLimitChange: (l: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pages,
  limit,
  onPageChange,
  onLimitChange,
}) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const left = Math.max(2, page - delta);
    const right = Math.min(pages - 1, page + delta);

    range.push(1);
    if (left > 2) range.push("…");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < pages - 1) range.push("…");
    if (pages > 1) range.push(pages);
    return range;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
      <div className="flex items-center gap-1">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {getPageNumbers().map((p, idx) =>
          p === "…" ? (
            <span key={idx} className="px-3 py-2">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`px-3 py-2 rounded-lg ${
                p === page
                  ? "bg-indigo-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          disabled={page >= pages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="limit" className="text-sm text-gray-600">
          Items per page:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
          className="rounded-lg border px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={52}>52</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
