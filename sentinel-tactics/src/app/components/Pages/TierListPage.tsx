"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChampionTable, { ChampionRow } from "../components/Table";
import { fetchTierList } from "../services/tierListService";
import { EloSelector } from "../components/EloSelector";

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

interface Props {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function TierListPage({ searchParams }: Props) {
    const router = useRouter();

    const [elo, setEloState] = useState(
        searchParams.elo ? (Array.isArray(searchParams.elo) ? searchParams.elo[0] : searchParams.elo) : "PLATINUM"
    );
    const [lane, setLaneState] = useState<Lane>(
        (searchParams.lane
            ? Array.isArray(searchParams.lane)
                ? searchParams.lane[0]
                : searchParams.lane
            : "ALL") as Lane
    );

    const [data, setData] = useState<ChampionRow[]>([]);
    const [limit, setLimit] = useState(PAGE_SIZE);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    function setElo(newElo: string) {
        setEloState(newElo);
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, v));
            } else if (value) {
                params.set(key, value);
            }
        });
        params.set("elo", newElo);
        router.replace(`?${params.toString()}`, { scroll: false });
    }

    function setLane(newLane: Lane) {
        setLaneState(newLane);
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, v));
            } else if (value) {
                params.set(key, value);
            }
        });
        if (newLane === "ALL") {
            params.delete("lane");
        } else {
            params.set("lane", newLane);
        }
        router.replace(`?${params.toString()}`, { scroll: false });
    }

    useEffect(() => {
        setLoading(true);
        setError(null);
        setLimit(PAGE_SIZE);
        fetchTierList(PAGE_SIZE, elo, lane === "ALL" ? undefined : lane)
            .then((rows) => {
                setData(Array.isArray(rows) ? rows : []);
                setHasMore(Array.isArray(rows) ? rows.length === PAGE_SIZE : false);
            })
            .catch(() => setError("Erro ao carregar tier list"))
            .finally(() => setLoading(false));
    }, [lane, elo]);

    function handleLoadMore() {
        const nextLimit = limit + PAGE_SIZE;
        setLoadingMore(true);
        fetchTierList(nextLimit, elo, lane === "ALL" ? undefined : lane)
            .then((rows) => {
                setData((prev) =>
                    Array.isArray(prev) && Array.isArray(rows)
                        ? [...prev, ...rows]
                        : Array.isArray(rows)
                        ? rows
                        : prev || []
                );
                setLimit(nextLimit);
                setHasMore(Array.isArray(rows) ? rows.length === nextLimit : false);
            })
            .catch(() => setError("Erro ao carregar mais"))
            .finally(() => setLoadingMore(false));
    }

    function handleChampionClick(champion: ChampionRow) {
        const name = encodeURIComponent(champion.name.toUpperCase());
        router.push(`/champion/${name}?elo=${elo}${lane !== "ALL" ? `&lane=${lane}` : ""}`);
    }

    return (
        <main className="flex flex-col gap-4">
            <section className="flex flex-col gap-6 py-4">
                <h1 className="text-4xl">Tier List</h1>

                <div className="flex flex-col gap-3">
                    <EloSelector value={elo} onChange={setElo} />

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
                </div>

                {loading && <p className="text-textSecondary">Carregando...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && Array.isArray(data) && (
                    <>
                        <ChampionTable data={data} onChampionClick={handleChampionClick} />
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
