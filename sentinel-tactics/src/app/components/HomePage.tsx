"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ChampionTable, { ChampionRow } from "../components/Table";
import { fetchTierList } from "../services/tierListService";
import { EloSelector } from "../components/EloSelector";

export default function HomePage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [elo, setEloState] = useState("PLATINUM");
    const [tierList, setTierList] = useState<ChampionRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const eloParam = searchParams.get("elo");
        if (eloParam) setEloState(eloParam);
    }, [searchParams]);

    function setElo(newElo: string) {
        setEloState(newElo);
        const params = new URLSearchParams(searchParams.toString());
        params.set("elo", newElo);
        router.replace(`?${params.toString()}`, { scroll: false });
    }

    function handleChampionClick(champion: ChampionRow) {
        const name = encodeURIComponent(champion.name.toUpperCase());
        router.push(`/champion/${name}?elo=${elo}`);
    }

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchTierList(10, elo)
            .then(setTierList)
            .catch(() => setError("Erro ao carregar tier list"))
            .finally(() => setLoading(false));
    }, [elo]);

    return (
        <main className="flex flex-col gap-4">
            <section className="flex flex-col gap-8 py-4">
                <h1 className="text-4xl">Ranked Performance Intelligence</h1>
                <div className="flex flex-row">
                    <div className="flex w-1/3">
                        <img src="/Logo.png" alt="logo" />
                    </div>
                    <p className="text-textPrimary text-lg justify-center items-center w-3/4 flex">
                        Sentinel Tactics é uma plataforma de análise competitiva focada em desempenho ranqueado.
                        Reunimos dados confiáveis, histórico consistente e leitura clara de performance para quem
                        valoriza informação precisa.
                    </p>
                </div>
            </section>

            <section className="flex flex-col py-4 gap-4">
                <h1 className="text-4xl">Statistic</h1>

                <EloSelector value={elo} onChange={setElo} />

                {loading && <p className="text-textPrimary">Carregando...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && <ChampionTable data={tierList} onChampionClick={handleChampionClick} />}
            </section>
        </main>
    );
}
