"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Button } from "../../components/Button";
import { MatchHistory } from "../../components/HistoryTable";
import { findPlayerService, PlayerInfo } from "../../services/findPlayerService";
import { getPlayerMatchesService, Match } from "../../services/getPlayerMatchesService";

export default function PlayerPage() {
    const router = useRouter();
    const params = useParams();
    const searchParamsHook = useSearchParams();

    const nome = decodeURIComponent((params?.name as string) ?? "");
    const tag = decodeURIComponent((params?.tag as string) ?? "");
    const region = searchParamsHook?.get("region") ?? "br1";

    const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMatches, setLoadingMatches] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!nome || !tag) return;

        setLoading(true);
        setError("");

        findPlayerService
            .getPlayerInfo({ nome, tag, regiao: region })
            .then((info) => {
                setPlayerInfo(info);
                return loadMatches(info.puuid);
            })
            .catch((err: any) => setError(err.message))
            .finally(() => setLoading(false));
    }, [nome, tag, region]);

    async function loadMatches(puuid: string) {
        setLoadingMatches(true);
        try {
            const matchData = await getPlayerMatchesService.getMatches({
                puuid,
                regiao: region,
                limite: 20,
            });
            setMatches(Array.isArray(matchData) ? matchData : []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoadingMatches(false);
        }
    }

    if (loading) {
        return (
            <main className="p-4 flex justify-center items-center min-h-[60vh]">
                <p className="text-2xl">
                    Buscando {nome}#{tag}...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="p-4 flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-2xl text-red-500">{error}</p>
                <Button variant="secondary" onClick={() => router.back()}>
                    Voltar
                </Button>
            </main>
        );
    }

    return (
        <main className="p-2 sm:p-4 flex flex-col gap-4 sm:gap-8">
            {/* HEADER */}
            <section className="flex flex-row gap-3 sm:gap-4 bg-surface p-3 sm:p-4 rounded items-center">
                <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
                    <img
                        src={
                            playerInfo
                                ? `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/${playerInfo.profileIconId}.png`
                                : "/Logo.png"
                        }
                        alt="playerImg"
                        className="rounded-full w-full h-full object-cover border-4 border-accent"
                    />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold">
                            {nome} <span className="text-textSecondary">#{tag}</span>
                        </h1>
                        <span className="text-textSecondary text-sm">
                            {region.toUpperCase()} {playerInfo && `• Nível ${playerInfo.summonerLevel}`}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="primary"
                            onClick={() => playerInfo && loadMatches(playerInfo.puuid)}
                            disabled={loadingMatches}
                        >
                            {loadingMatches ? "Atualizando..." : "Atualizar"}
                        </Button>
                        <Button variant="secondary" onClick={() => router.back()}>
                            ← Voltar
                        </Button>
                    </div>
                </div>
            </section>

            {/* RANKED */}
            <section className="flex flex-col bg-surface p-3 sm:p-4 rounded">
                <h2 className="text-lg sm:text-xl mb-3">Ranqueada Solo/Duo</h2>
                {playerInfo?.soloQueue ? (
                    <div className="p-2 sm:p-4 flex flex-row gap-3 sm:gap-4 items-center">
                        <div className="w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0">
                            <img
                                src={`https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/images/ranked-emblems/Rank=${playerInfo.soloQueue.tier.toLowerCase()}.png`}
                                alt={`${playerInfo.soloQueue.tier} ${playerInfo.soloQueue.rank}`}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.src = "/Logo.png";
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xl sm:text-2xl font-bold">
                                {playerInfo.soloQueue.tier} {playerInfo.soloQueue.rank}
                            </p>
                            <p className="text-base sm:text-lg">{playerInfo.soloQueue.leaguePoints} LP</p>
                            <p className="text-textSecondary text-sm">
                                {playerInfo.soloQueue.wins}W / {playerInfo.soloQueue.losses}L
                            </p>
                            <p className="text-textSecondary text-sm">Win Rate: {playerInfo.soloQueue.winRate}%</p>
                        </div>
                    </div>
                ) : (
                    <div className="p-2 sm:p-4 flex flex-row gap-3 sm:gap-4 items-center">
                        <div className="w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0">
                            <img
                                src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/images/ranked-emblems/Rank=unranked.png"
                                alt="Unranked"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="text-textSecondary text-lg sm:text-xl">Unranked</p>
                    </div>
                )}
            </section>

            {/* HISTÓRICO */}
            <section className="bg-surface p-3 sm:p-4 rounded">
                <h2 className="text-lg sm:text-xl mb-3">
                    Histórico de Partidas
                    {loadingMatches && <span className="text-sm ml-2 text-textSecondary">(Carregando...)</span>}
                </h2>
                {Array.isArray(matches) && matches.length > 0 ? (
                    <MatchHistory matches={matches} />
                ) : (
                    !loadingMatches && <p className="text-textSecondary">Nenhuma partida encontrada</p>
                )}
            </section>
        </main>
    );
}
