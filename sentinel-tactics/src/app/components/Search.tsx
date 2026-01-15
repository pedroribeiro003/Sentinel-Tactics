"use client";

import { useState } from "react";

type SearchProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
};

export default function Search({
  placeholder = "Pesquisar jogador...",
  onSearch,
}: SearchProps) {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setValue(text);
    onSearch?.(text);
  }

  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-md
          bg-surface
          px-4
          py-2
          text-textPrimary
          placeholder:text-textSecondary
          outline-none
          border
          border-accent
          focus:border-highlight
          focus:ring-1
          focus:ring-highlight
          transition
        "
      />
    </div>
  );
}
