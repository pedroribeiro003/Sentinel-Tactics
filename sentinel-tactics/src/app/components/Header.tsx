"use client";
import SearchBar from "./SearchBar";

export default function Header() {
    function handleSearch(query: string, region: string) {}
    return (
        <header className="flex flex-row w-full h-24 bg-accent gap-6 border-2 border-highlight ">
            <div className="flex ">
                <img src="/Logo-name.png" alt="Logo" />
            </div>
            <div className="flex justify-center items-center">
                <button className="flex text-lg text-textPrimary">Champions</button>
            </div>
            <div className="flex justify-center items-center">
                <button className="flex text-lg text-textPrimary">Pro Builds</button>
            </div>
            <div className="flex justify-center items-center">
                <button className="flex text-lg text-textPrimary">Tier List</button>
            </div>
            <div className="flex flex-1 justify-end items-center pr-8">
                <SearchBar onSearch={handleSearch} />
            </div>
        </header>
    );
}
