"use client";

import { useEffect, useState } from "react";
import ChampionTable, { ChampionRow } from "../components/Table";
import { fetchTierList } from "../services/tierListService";

const LANES = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"] as const;
type Lane = (typeof LANES)[number] | "ALL";

const LANE_LABELS: Record<Lane, string> = {
    ALL: "Todos",
    TOP: "Top",
    JUNGLE: "Jungle",
    MIDDLE: "Mid",
    BOTTOM: "Bot",
    UTILITY: "Support",
};

const PAGE_SIZE = 20;

export default function TierListPage() {
    const [data, setData] = useState<ChampionRow[]>([]);
    const [lane, setLane] = useState<Lane>("ALL");
    const [limit, setLimit] = useState(PAGE_SIZE);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setLimit(PAGE_SIZE);
        fetchTierList(PAGE_SIZE, "PLATINUM", lane === "ALL" ? undefined : lane)
            .then((rows) => {
                setData(rows);
                setHasMore(rows.length === PAGE_SIZE);
            })
            .catch(() => setError("Erro ao carregar tier list"))
            .finally(() => setLoading(false));
    }, [lane]);

    function handleLoadMore() {
        const nextLimit = limit + PAGE_SIZE;
        setLoadingMore(true);
        fetchTierList(nextLimit, "PLATINUM", lane === "ALL" ? undefined : lane)
            .then((rows) => {
                setData(rows);
                setLimit(nextLimit);
                setHasMore(rows.length === nextLimit);
            })
            .catch(() => setError("Erro ao carregar mais"))
            .finally(() => setLoadingMore(false));
    }

    return (
        <main className="flex flex-col gap-4">
            <section className="flex flex-col gap-8 py-4">
                <h1 className="text-4xl">Tier List</h1>

                <div className="flex gap-2 flex-wrap">
                    {(["ALL", ...LANES] as Lane[]).map((l) => (
                        <button
                            key={l}
                            onClick={() => setLane(l)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition border ${
                                lane === l
                                    ? "bg-accent text-white border-accent"
                                    : "bg-surface text-textSecondary border-accent hover:text-textPrimary"
                            }`}
                        >
                            {LANE_LABELS[l]}
                        </button>
                    ))}
                </div>

                {loading && <p className="text-textSecondary">Carregando...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <>
                        <ChampionTable data={data} />
                        {hasMore && (
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="mx-auto px-6 py-2 rounded-md border border-accent text-textSecondary hover:text-textPrimary transition disabled:opacity-50"
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
