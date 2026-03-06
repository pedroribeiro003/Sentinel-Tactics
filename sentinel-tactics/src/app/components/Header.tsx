"use client";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full bg-accent border-b-2 border-highlight">
            {/* BARRA PRINCIPAL */}
            <div className="flex items-center h-16 sm:h-24 px-3 sm:px-4 gap-3 sm:gap-6">
                {/* LOGO */}
                <Link href="/" className="flex flex-shrink-0">
                    <img src="/Logo-name.png" alt="Logo" className="h-10 sm:h-16 object-contain cursor-pointer" />
                </Link>

                {/* LINKS — só desktop */}
                <Link href="/pro-builds" className="hidden sm:flex justify-center items-center">
                    <button className="text-lg text-textPrimary hover:text-highlight transition">Pro Builds</button>
                </Link>
                <Link href="/tier-list" className="hidden sm:flex justify-center items-center">
                    <button className="text-lg text-textPrimary hover:text-highlight transition">Tier List</button>
                </Link>

                {/* SEARCH — só desktop */}
                <div className="hidden sm:flex flex-1 justify-end items-center pr-8">
                    <SearchBar onSearch={() => {}} />
                </div>

                {/* SPACER mobile */}
                <div className="flex-1 sm:hidden" />

                {/* HAMBURGER — só mobile */}
                <button
                    onClick={() => setMenuOpen((v) => !v)}
                    className="sm:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 flex-shrink-0"
                    aria-label="Menu"
                >
                    <span
                        className={`block w-6 h-0.5 bg-textPrimary transition-all duration-200 ${
                            menuOpen ? "rotate-45 translate-y-2" : ""
                        }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-textPrimary transition-all duration-200 ${
                            menuOpen ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-textPrimary transition-all duration-200 ${
                            menuOpen ? "-rotate-45 -translate-y-2" : ""
                        }`}
                    />
                </button>
            </div>

            {/* MENU MOBILE */}
            {menuOpen && (
                <div className="sm:hidden flex flex-col border-t border-highlight/40 bg-accent pb-4">
                    {/* Search dentro do menu */}
                    <div className="px-4 py-3 border-b border-highlight/20">
                        <SearchBar onSearch={() => {}} />
                    </div>
                    <Link
                        href="/pro-builds"
                        onClick={() => setMenuOpen(false)}
                        className="px-4 py-3 text-textPrimary hover:bg-highlight/20 transition border-b border-highlight/20"
                    >
                        Pro Builds
                    </Link>
                    <Link
                        href="/tier-list"
                        onClick={() => setMenuOpen(false)}
                        className="px-4 py-3 text-textPrimary hover:bg-highlight/20 transition"
                    >
                        Tier List
                    </Link>
                </div>
            )}
        </header>
    );
}
