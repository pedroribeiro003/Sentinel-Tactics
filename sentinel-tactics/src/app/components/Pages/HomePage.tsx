"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChampionTable, { ChampionRow } from "../Table";
import { fetchTierList } from "../../services/tierListService";
import { EloSelector } from "../EloSelector";

interface Props {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function HomePage({ searchParams }: Props) {
    const router = useRouter();

    const [elo, setEloState] = useState("PLATINUM");
    const [tierList, setTierList] = useState<ChampionRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const eloParam = searchParams.elo
            ? Array.isArray(searchParams.elo)
                ? searchParams.elo[0]
                : searchParams.elo
            : undefined;

        if (eloParam) setEloState(eloParam);
    }, [searchParams]);

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

    function handleChampionClick(champion: ChampionRow) {
        const name = encodeURIComponent(champion.name);
        router.push(`/champion/${name}?elo=${elo}`);
    }

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchTierList(10, elo)
            .then((data) => {
                setTierList(Array.isArray(data) ? data : []);
            })
            .catch(() => {
                setError("Erro ao carregar tier list");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [elo]);

    return (
        <main className="flex flex-col gap-4">
            <section className="flex flex-col gap-6 sm:gap-8 py-4">
                <h1 className="text-2xl sm:text-4xl font-bold">Ranked Performance Intelligence</h1>

                {/* Hero: empilha no mobile, lado a lado no desktop */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
                    <div className="flex w-40 sm:w-1/3 flex-shrink-0">
                        <img src="/Logo.png" alt="logo" className="w-full h-auto object-contain" />
                    </div>
                    <p className="text-textPrimary text-sm sm:text-lg text-center sm:text-left sm:justify-center sm:items-center sm:w-3/4 sm:flex">
                        Sentinel Tactics é uma plataforma de análise competitiva focada em desempenho ranqueado.
                        Reunimos dados confiáveis, histórico consistente e leitura clara de performance para quem
                        valoriza informação precisa.
                    </p>
                </div>
            </section>

            <section className="flex flex-col py-4 gap-4">
                <h1 className="text-2xl sm:text-4xl font-bold">Statistic</h1>

                <EloSelector value={elo} onChange={setElo} />

                {loading && <p className="text-textPrimary">Carregando...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && Array.isArray(tierList) && tierList.length > 0 && (
                    <div className="overflow-x-auto">
                        <ChampionTable data={tierList} onChampionClick={handleChampionClick} />
                    </div>
                )}
                {!loading && !error && Array.isArray(tierList) && tierList.length === 0 && (
                    <p className="text-textSecondary">Nenhuma informação disponível para este elo.</p>
                )}
            </section>
        </main>
    );
}
