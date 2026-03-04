// SearchBar.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { fetchChampionList, ChampionListItem } from "../services/championListService";

interface SearchBarProps {
    onSearch: (query: string, region: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [region, setRegion] = useState("br1");
    const [allChampions, setAllChampions] = useState<ChampionListItem[]>([]);
    const [suggestions, setSuggestions] = useState<ChampionListItem[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isLoadingChampions, setIsLoadingChampions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // ✅ USANDO O SERVICE
    useEffect(() => {
        const loadChampions = async () => {
            setIsLoadingChampions(true);
            try {
                console.log("🔍 Carregando champions via service...");
                const champions = await fetchChampionList();
                setAllChampions(champions);
                console.log(`✅ ${champions.length} champions carregados`);
            } catch (error) {
                console.error("❌ Erro ao carregar champions:", error);
            } finally {
                setIsLoadingChampions(false);
            }
        };

        loadChampions();
    }, []);

    // Filtrar sugestões localmente
    useEffect(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query || query.includes("#")) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const filtered = allChampions
            .filter((champion) => champion.name.toLowerCase().includes(query))
            .sort((a, b) => {
                const aStarts = a.name.toLowerCase().startsWith(query);
                const bStarts = b.name.toLowerCase().startsWith(query);

                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                return a.name.localeCompare(b.name);
            })
            .slice(0, 8);

        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
        setSelectedIndex(-1);
    }, [searchQuery, allChampions]);

    // Fechar sugestões ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        const query = searchQuery.trim();

        if (!query) {
            alert("Digite algo para buscar");
            return;
        }

        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
            navigateToChampion(suggestions[selectedIndex].name);
            return;
        }

        if (query.includes("#")) {
            const [playerName, playerTag] = query.split("#").map((s) => s.trim());

            if (!playerName || !playerTag) {
                alert("Formato inválido! Use: NomeDoJogador#Tag");
                return;
            }

            onSearch(`${playerName}#${playerTag}`, region);
            router.push(`/player/${encodeURIComponent(playerName)}/${encodeURIComponent(playerTag)}?region=${region}`);
            setShowSuggestions(false);
        } else {
            navigateToChampion(query);
        }
    };

    const navigateToChampion = (championName: string) => {
        router.push(`/champion/${encodeURIComponent(championName)}`);
        setShowSuggestions(false);
        setSearchQuery("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions || suggestions.length === 0) {
            if (e.key === "Enter") {
                handleSubmit();
            }
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
                break;

            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;

            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                    navigateToChampion(suggestions[selectedIndex].name);
                } else {
                    handleSubmit();
                }
                break;

            case "Escape":
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };

    const handleSuggestionClick = (championName: string) => {
        navigateToChampion(championName);
    };

    return (
        <div ref={searchRef} className="relative">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Campeão ou Jogador#Tag"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setSelectedIndex(-1);
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => {
                            if (suggestions.length > 0) setShowSuggestions(true);
                        }}
                        className="px-4 py-2 bg-background text-textPrimary rounded-lg border-2 border-highlight focus:outline-none focus:border-accent w-80 placeholder:text-textSecondary"
                    />

                    {isLoadingChampions && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-highlight border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>

                {searchQuery.includes("#") && (
                    <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="px-3 py-2 bg-background text-textPrimary rounded-lg border-2 border-highlight focus:outline-none focus:border-accent"
                    >
                        <option value="br1">🇧🇷 BR</option>
                        <option value="na1">🇺🇸 NA</option>
                        <option value="euw1">🇪🇺 EUW</option>
                        <option value="eun1">🇪🇺 EUNE</option>
                        <option value="kr">🇰🇷 KR</option>
                        <option value="jp1">🇯🇵 JP</option>
                        <option value="la1">🌎 LAN</option>
                        <option value="la2">🌎 LAS</option>
                        <option value="oc1">🇦🇺 OCE</option>
                        <option value="tr1">🇹🇷 TR</option>
                        <option value="ru">🇷🇺 RU</option>
                        <option value="ph2">🇵🇭 PH</option>
                        <option value="sg2">🇸🇬 SG</option>
                        <option value="th2">🇹🇭 TH</option>
                        <option value="tw2">🇹🇼 TW</option>
                        <option value="vn2">🇻🇳 VN</option>
                    </select>
                )}

                <button
                    type="submit"
                    className="px-6 py-2 bg-highlight text-background font-bold rounded-lg hover:bg-accent transition-all hover:scale-105"
                >
                    🔍
                </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-80 bg-surface border-2 border-highlight rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    {suggestions.map((champion, index) => (
                        <button
                            key={champion.id}
                            type="button"
                            onClick={() => handleSuggestionClick(champion.name)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition ${
                                index === selectedIndex ? "bg-accent" : ""
                            }`}
                        >
                            <img
                                src={champion.image || "/placeholder-champion.png"}
                                alt={champion.name}
                                className="w-10 h-10 rounded-full border-2 border-highlight object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = "/placeholder-champion.png";
                                }}
                            />
                            <span className="text-textPrimary font-medium">{champion.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
