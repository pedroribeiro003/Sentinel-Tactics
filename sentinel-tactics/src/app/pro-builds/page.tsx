"use client";

import { useEffect, useState } from "react";
import { fetchProBuilds, ProBuild } from "../services/proBuildsService";
import ProBuildCard from "../components/ProBuildCard";

const LANES = [
    { value: "", label: "Todas" },
    { value: "TOP", label: "Top" },
    { value: "JUNGLE", label: "Jungle" },
    { value: "MIDDLE", label: "Mid" },
    { value: "BOTTOM", label: "ADC" },
    { value: "UTILITY", label: "Suporte" },
];

const REGIONS = [
    { value: "", label: "Todas Regiões" },
    { value: "KR", label: "🇰🇷 Korea" },
    { value: "EUW1", label: "🇪🇺 EUW" },
    { value: "NA1", label: "🇺🇸 NA" },
    { value: "BR1", label: "🇧🇷 Brasil" },
    { value: "EUN1", label: "🇪🇺 EUNE" },
    { value: "TR1", label: "🇹🇷 Turquia" },
    { value: "JP1", label: "🇯🇵 Japão" },
    { value: "OC1", label: "🌏 OCE" },
];

const PAGE_SIZE = 20;

export default function ProBuildsPage() {
    const [builds, setBuilds] = useState<ProBuild[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [championFilter, setChampionFilter] = useState("");
    const [laneFilter, setLaneFilter] = useState("");
    const [regionFilter, setRegionFilter] = useState("");
    const [debouncedChampion, setDebouncedChampion] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedChampion(championFilter), 400);
        return () => clearTimeout(timer);
    }, [championFilter]);

    useEffect(() => {
        setPage(1);
        setBuilds([]);
        loadBuilds(1, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedChampion, laneFilter, regionFilter]);

    async function loadBuilds(pageNum: number, isNewSearch: boolean) {
        isNewSearch ? setLoading(true) : setLoadingMore(true);
        setError(null);
        try {
            const params: Record<string, string | number> = { limit: PAGE_SIZE, page: pageNum };
            if (debouncedChampion) params.champion = debouncedChampion;
            if (laneFilter) params.lane = laneFilter;
            if (regionFilter) params.region = regionFilter;

            const result = await fetchProBuilds(params);
            if (isNewSearch) {
                setBuilds(Array.isArray(result.builds) ? result.builds : []);
            } else {
                setBuilds((prev) => [...(prev || []), ...(result.builds || [])]);
            }
            setTotal(result.total || 0);
        } catch {
            setError("Erro ao carregar pro builds");
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }

    function handleLoadMore() {
        const nextPage = page + 1;
        setPage(nextPage);
        loadBuilds(nextPage, false);
    }

    const hasMore = Array.isArray(builds) ? builds.length < total : false;

    return (
        <main className="flex flex-col gap-4 sm:gap-6 py-4">
            {/* Header */}
            <section className="flex flex-col gap-1 sm:gap-2">
                <h1 className="text-2xl sm:text-4xl font-bold">Pro Builds</h1>
                <p className="text-textSecondary text-xs sm:text-sm">
                    Builds recentes utilizadas por jogadores profissionais em partidas ranqueadas de solo queue.
                </p>
            </section>

            {/* Filtros */}
            <section className="flex flex-col gap-3">
                <input
                    type="text"
                    value={championFilter}
                    onChange={(e) => setChampionFilter(e.target.value)}
                    placeholder="Filtrar por campeão..."
                    className="w-full sm:max-w-md rounded-md bg-surface px-4 py-2 text-textPrimary placeholder:text-textSecondary outline-none border border-accent focus:border-highlight focus:ring-1 focus:ring-highlight transition text-sm"
                />

                {/* Lane filter — scroll horizontal no mobile */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {LANES.map((lane) => (
                        <button
                            key={lane.value}
                            onClick={() => setLaneFilter(lane.value)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition flex-shrink-0 ${
                                laneFilter === lane.value
                                    ? "bg-highlight text-textPrimary shadow-md"
                                    : "bg-surface text-textSecondary border border-accent/40 hover:border-highlight hover:bg-accent/20"
                            }`}
                        >
                            {lane.label}
                        </button>
                    ))}
                </div>

                {/* Region */}
                <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="w-full sm:w-auto px-3 py-1.5 text-xs rounded-md bg-surface text-textPrimary border border-accent/40 outline-none cursor-pointer focus:border-highlight transition"
                >
                    {REGIONS.map((r) => (
                        <option key={r.value} value={r.value}>
                            {r.label}
                        </option>
                    ))}
                </select>
            </section>

            {/* Resultados */}
            <section className="flex flex-col gap-2">
                {!loading && !error && (
                    <p className="text-xs text-textSecondary mb-1">
                        {total > 0 ? `Exibindo ${builds.length} de ${total} builds` : "Nenhuma build encontrada"}
                    </p>
                )}

                {/* Header tabela — só desktop */}
                {!loading && !error && builds.length > 0 && (
                    <div className="hidden sm:grid grid-cols-[200px_100px_90px_220px_1fr_70px_100px] gap-4 px-4 py-2 text-xs text-textSecondary border-b border-accent/30">
                        <span className="pl-2">Champion</span>
                        <span>Lane</span>
                        <span className="text-center">KDA</span>
                        <span>Items</span>
                        <span />
                        <span className="text-center">CS</span>
                        <span className="text-right">Info</span>
                    </div>
                )}

                {loading && <p className="text-textPrimary py-8 text-center">Carregando...</p>}
                {error && <p className="text-red-500 py-8 text-center">{error}</p>}

                {!loading && !error && (
                    <div className="flex flex-col gap-1">
                        {builds.map((build) => (
                            <ProBuildCard key={build.id} build={build} />
                        ))}
                    </div>
                )}

                {!loading && !error && hasMore && (
                    <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="mt-4 mx-auto px-6 py-2 text-sm font-medium rounded-md bg-accent text-textPrimary hover:bg-accentHover shadow-md transition disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {loadingMore ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-textSecondary border-t-textPrimary inline-block" />
                        ) : (
                            "Carregar mais"
                        )}
                    </button>
                )}
            </section>
        </main>
    );
}
