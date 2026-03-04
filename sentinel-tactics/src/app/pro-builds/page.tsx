"use client";

import { useEffect, useState } from "react";
import { ProBuildCard } from "../components/ProBuildCard";
import { fetchProBuilds, ProBuild } from "../services/proBuildsService";

const LANES = ["TOP", "JGL", "MID", "ADC", "SUP"] as const;
type Lane = (typeof LANES)[number] | "ALL";

const REGIONS = ["ALL", "KR", "EUW", "NA", "BR", "LAN", "LAS", "OCE", "TR", "RU", "JP"] as const;
type Region = (typeof REGIONS)[number];

const PAGE_SIZE = 20;

export default function ProBuildsPage() {
    const [builds, setBuilds] = useState<ProBuild[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [champion, setChampion] = useState("");
    const [lane, setLane] = useState<Lane>("ALL");
    const [region, setRegion] = useState<Region>("ALL");
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setPage(1);
        fetchProBuilds({
            champion: champion || undefined,
            lane: lane === "ALL" ? undefined : lane,
            region: region === "ALL" ? undefined : region,
            limit: PAGE_SIZE,
            page: 1,
        })
            .then(({ builds: rows, total: t }) => {
                setBuilds(rows);
                setTotal(t);
            })
            .catch(() => setError("Erro ao carregar pro builds"))
            .finally(() => setLoading(false));
    }, [champion, lane, region]);

    function handleLoadMore() {
        const nextPage = page + 1;
        setLoadingMore(true);
        fetchProBuilds({
            champion: champion || undefined,
            lane: lane === "ALL" ? undefined : lane,
            region: region === "ALL" ? undefined : region,
            limit: PAGE_SIZE,
            page: nextPage,
        })
            .then(({ builds: rows }) => {
                setBuilds((prev) => [...prev, ...rows]);
                setPage(nextPage);
            })
            .catch(() => setError("Erro ao carregar mais"))
            .finally(() => setLoadingMore(false));
    }

    const hasMore = builds.length < total;

    return (
        <main className="flex flex-col gap-6 py-4">
            {/* Header */}
            <section className="flex flex-col gap-2">
                <h1 className="text-4xl text-textPrimary">Pro Builds</h1>
                <p className="text-textSecondary">
                    Builds utilizadas por jogadores profissionais coletadas do TrackingThePros.com
                </p>
            </section>

            {/* Filters */}
            <section className="flex flex-col gap-4 bg-surface border border-accent/30 rounded-md p-4">
                {/* Search */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Filtrar por campeão..."
                        value={champion}
                        onChange={(e) => setChampion(e.target.value)}
                        className="flex-1 px-4 py-2 bg-background border border-accent/40 rounded-md text-textPrimary placeholder-textSecondary text-sm focus:outline-none focus:border-highlight"
                    />

                    {/* Region */}
                    <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value as Region)}
                        className="px-4 py-2 bg-background border border-accent/40 rounded-md text-textPrimary text-sm focus:outline-none focus:border-highlight"
                    >
                        {REGIONS.map((r) => (
                            <option key={r} value={r}>
                                {r === "ALL" ? "Todas as Regiões" : r}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Lane buttons */}
                <div className="flex gap-2 flex-wrap">
                    {(["ALL", ...LANES] as Lane[]).map((l) => (
                        <button
                            key={l}
                            onClick={() => setLane(l)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition border ${
                                lane === l
                                    ? "bg-accent text-white border-accent"
                                    : "bg-surface text-textSecondary border-accent/40 hover:text-textPrimary hover:border-accent"
                            }`}
                        >
                            {l}
                        </button>
                    ))}
                </div>
            </section>

            {/* Results */}
            <section className="flex flex-col gap-3">
                {loading && <p className="text-textSecondary">Carregando...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && builds.length === 0 && (
                    <p className="text-textSecondary">Nenhuma build encontrada</p>
                )}

                {!loading && !error && builds.length > 0 && (
                    <>
                        <p className="text-xs text-textSecondary">{total} builds encontradas</p>
                        <div className="space-y-3">
                            {builds.map((build) => (
                                <ProBuildCard key={build.id} build={build} />
                            ))}
                        </div>

                        {hasMore && (
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="mx-auto mt-4 px-6 py-2 rounded-md border border-accent text-textSecondary hover:text-textPrimary transition disabled:opacity-50"
                            >
                                {loadingMore ? "Carregando..." : "Carregar mais"}
                            </button>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}
