"use client";

import { useState } from "react";
import { Search } from "lucide-react";

type Region = {
  value: string;
  label: string;
};

const REGIONS: Region[] = [
  { value: "BR1", label: "BR" },
  { value: "NA1", label: "NA" },
  { value: "EUW1", label: "EUW" },
  { value: "EUN1", label: "EUNE" },
  { value: "KR", label: "KR" },
];

type SearchBarProps = {
  onSearch?: (query: string, region: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("BR1");

  function handleSearch() {
    if (!query.trim()) return;
    onSearch?.(query.trim(), region);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="flex w-full max-w-xl items-center gap-2">
      {/* Região */}
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="
          h-10
          rounded-md
          bg-surface
          px-3
          text-sm
          text-textPrimary
          outline-none
          border
          border-accent
          focus:border-highlight
        "
      >
        {REGIONS.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>

      {/* Input */}
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar jogador..."
          className="
            h-10
            w-full
            rounded-md
            bg-surface
            pl-10
            pr-3
            text-textPrimary
            placeholder:text-textSecondary
            outline-none
            border
            border-accent
            focus:border-highlight
            focus:ring-1
            focus:ring-highlight
          "
        />

        {/* Ícone lupa */}
        <button
          onClick={handleSearch}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-textSecondary
            hover:text-textPrimary
            transition
          "
          aria-label="Pesquisar"
        >
          <Search size={18} />
        </button>
      </div>
    </div>
  );
}
