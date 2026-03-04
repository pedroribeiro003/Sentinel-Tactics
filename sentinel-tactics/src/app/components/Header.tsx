// Header.tsx
"use client";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Header() {
    function handleSearch(query: string, region: string) {
        // SearchBar já redireciona internamente
    }

    return (
        <header className="flex flex-row w-full h-24 bg-accent gap-6 border-2 border-highlight">
            <Link href="/" className="flex">
                <img src="/Logo-name.png" alt="Logo" className="h-full object-contain cursor-pointer" />
            </Link>

            <Link href="/pro-builds" className="flex justify-center items-center">
                <button className="flex text-lg text-textPrimary hover:text-highlight transition">Pro Builds</button>
            </Link>

            <Link href="/tier-list" className="flex justify-center items-center">
                <button className="flex text-lg text-textPrimary hover:text-highlight transition">Tier List</button>
            </Link>

            <div className="flex flex-1 justify-end items-center pr-8">
                <SearchBar onSearch={handleSearch} />
            </div>
        </header>
    );
}
