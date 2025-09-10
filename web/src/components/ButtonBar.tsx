import React, { useState } from "react";

type Props = { onFetch: (q: string) => void; loading: boolean };

const ButtonBar: React.FC<Props> = ({ onFetch, loading }) => {
  const [q, setQ] = useState("");
  const titles = ["Matrix", "Matrix Reloaded", "Matrix Revolutions"];

  const submit = () => {
    setQ("");
    const v = q.trim();
    if (!v) return;
    onFetch(v);
  };

  return (
    <div className="flex gap-3 flex-wrap items-center">
      {titles.map((title) => (
        <button
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
          onClick={() => onFetch(title)}
        >
          {title}
        </button>
      ))}

      <div className="flex items-stretch gap-2 w-full sm:w-auto">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Search for other movies..."
          className="flex-1 min-w-[200px] rounded-xl border border-gray-300 px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-black/40"
          aria-label="Search input"
        />
        <button
          disabled={loading || q.trim() === ""}
          className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
          onClick={submit}
        >
          Search
        </button>
      </div>

      {loading && (
        <svg
          className="animate-spin"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
    </div>
  );
};

export default ButtonBar;
