import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpWideNarrow, ArrowDownWideNarrow } from "lucide-react";
import { L } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";
import Loading from "../../assets/Loading";

type Props = { onFetch: (q: string) => void; loading: boolean };

const ButtonBar: React.FC<Props> = ({ onFetch, loading }) => {
  const [q, setQ] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "title";
  const order = searchParams.get("order") || "asc";
  const limit = searchParams.get("limit") || "12";

  const titles = ["Matrix", "Matrix Reloaded", "Matrix Revolutions"];

  const submit = () => {
    const v = q.trim();
    if (!v) return;
    onFetch(v);
    setQ("");
  };

  const updateSort = (s: string) => {
    setSearchParams({ sort: s, order, limit, page: "1" });
  };

  const toggleOrder = () => {
    setSearchParams({
      sort,
      order: order === "asc" ? "desc" : "asc",
      limit,
      page: "1",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-start sm:items-center">
      <div className="flex flex-wrap gap-2">
        {titles.map((title) => (
          <button
            key={title}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50 hover:bg-gray-800 transition"
            onClick={() => onFetch(title)}
          >
            {title}
          </button>
        ))}
      </div>

      <div className="flex items-stretch gap-2 w-full sm:w-auto">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Search for other movies..."
          className="flex-1 min-w-[200px] rounded-xl border border-gray-300 px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Search input"
          disabled={loading}
        />
        <button
          disabled={loading || q.trim() === ""}
          className="px-4 py-2 rounded-xl bg-black text-white
                     disabled:opacity-50 transition"
          onClick={submit}
        >
          Search
        </button>
      </div>

      <div className="flex items-center gap-2 ml-auto w-full sm:w-auto">
        <select
          value={sort}
          onChange={(e) => updateSort(e.target.value)}
          className="rounded-lg border px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-auto"
        >
          <option value="title" className="text-gray-800 bg-white">
            Title
          </option>
          <option value="year" className="text-gray-800 bg-white">
            Year
          </option>
          <option value="createdAt" className="text-gray-800 bg-white">
            Date Added
          </option>
        </select>

        <button
          type="button"
          onClick={toggleOrder}
          className="p-2 rounded-lg border bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Toggle order"
        >
          {order === "asc" ? (
            <ArrowUpWideNarrow className="w-5 h-5 text-black" />
          ) : (
            <ArrowDownWideNarrow className="w-5 h-5 text-black" />
          )}
        </button>
      </div>

      {loading && <Loading />}
    </div>
  );
};

export default ButtonBar;
