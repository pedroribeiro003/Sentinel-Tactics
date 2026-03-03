"use client";
import { useState } from "react";
import { Button } from "../components/Button";
import { MatchHistory } from "../components/HistoryTable";
import { findPlayerService, PlayerInfo } from "../services/findPlayerService";
import { getPlayerMatchesService, Match } from "../services/getPlayerMatchesService";

export default function PlayerPage() {
    const [nome, setNome] = useState("");
    const [tag, setTag] = useState("");
    const [regiao, setRegiao] = useState("br1");
    const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMatches, setLoadingMatches] = useState(false);
    const [error, setError] = useState("");
    const [searched, setSearched] = useState(false);
    const [limite, setLimite] = useState(20);

    const handleSearch = async () => {
        if (!nome || !tag) {
            setError("Nome e tag são obrigatórios");
            return;
        }

        setLoading(true);
        setError("");
        setPlayerInfo(null);
        setMatches([]);

        try {
            // Buscar informações do jogador (PUUID + Rank)
            const info = await findPlayerService.getPlayerInfo({ nome, tag, regiao });
            setPlayerInfo(info);
            setSearched(true);

            // Buscar histórico de partidas
            await loadMatchHistory(info.puuid);
        } catch (err: any) {
            setError(err.message);
            setSearched(false);
        } finally {
            setLoading(false);
        }
    };

    const loadMatchHistory = async (puuid?: string) => {
        const puuidToUse = puuid || playerInfo?.puuid;

        if (!puuidToUse) return;

        setLoadingMatches(true);

        try {
            const matchData = await getPlayerMatchesService.getMatches({
                puuid: puuidToUse,
                regiao,
                limite,
            });
            setMatches(matchData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoadingMatches(false);
        }
    };

    const handleUpdate = async () => {
        if (!playerInfo) return;
        await loadMatchHistory();
    };

    if (!searched) {
        return (
            <main className="p-4">
                <section className="flex flex-col gap-4 bg-surface p-8 max-w-md mx-auto">
                    <h1 className="text-2xl mb-4">Buscar Jogador</h1>

                    <input
                        type="text"
                        placeholder="Nome do jogador"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="px-4 py-2 bg-background text-text rounded"
                    />

                    <input
                        type="text"
                        placeholder="Tag (ex: 2003)"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="px-4 py-2 bg-background text-text rounded"
                    />

                    <select
                        value={regiao}
                        onChange={(e) => setRegiao(e.target.value)}
                        className="px-4 py-2 bg-background text-text rounded"
                    >
                        <option value="br1">Brasil (BR1)</option>
                        <option value="na1">North America (NA1)</option>
                        <option value="euw1">Europe West (EUW1)</option>
                        <option value="eune1">Europe Nordic & East (EUNE1)</option>
                        <option value="kr">Korea (KR)</option>
                        <option value="jp1">Japan (JP1)</option>
                        <option value="lan">Latin America North (LAN)</option>
                        <option value="las">Latin America South (LAS)</option>
                        <option value="oce">Oceania (OCE)</option>
                        <option value="tr1">Turkey (TR1)</option>
                        <option value="ru">Russia (RU)</option>
                    </select>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-textSecondary">Número de partidas (1-100):</label>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            value={limite}
                            onChange={(e) => setLimite(parseInt(e.target.value) || 20)}
                            className="px-4 py-2 bg-background text-text rounded"
                        />
                    </div>

                    <Button variant="primary" onClick={handleSearch} disabled={loading}>
                        {loading ? "Buscando..." : "Buscar"}
                    </Button>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                </section>
            </main>
        );
    }

    return (
        <main className="p-4 flex flex-col gap-8">
            <section className="flex flex-row gap-4 bg-surface p-4">
                <div className="w-24 h-24">
                    <img
                        src={
                            playerInfo
                                ? `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/${playerInfo.profileIconId}.png`
                                : "/Logo.png"
                        }
                        alt="playerImg"
                        className="rounded-full"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-2xl">
                        {nome} #{tag}
                    </h1>
                    <span className="text-textSecondary">
                        {regiao.toUpperCase()} {playerInfo && `• Level ${playerInfo.summonerLevel}`}
                    </span>
                    <span className="text-xs text-textSecondary mt-1">PUUID: {playerInfo?.puuid}</span>
                    <div className="py-2 flex gap-2">
                        <Button variant="primary" onClick={handleUpdate} disabled={loading || loadingMatches}>
                            {loading || loadingMatches ? "Atualizando..." : "Atualizar"}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setSearched(false);
                                setPlayerInfo(null);
                                setNome("");
                                setTag("");
                                setMatches([]);
                            }}
                        >
                            Nova Busca
                        </Button>
                    </div>
                </div>
            </section>

            {error && (
                <div className="bg-red-500/10 border border-red-500 p-4 rounded">
                    <p className="text-red-500">{error}</p>
                </div>
            )}

            <section className="flex flex-col bg-surface p-4">
                <h2 className="text-xl mb-4">Ranqueada Solo/Duo</h2>
                {playerInfo?.soloQueue ? (
                    <div className="p-4 flex flex-row gap-4 items-center">
                        <div className="w-32 h-32">
                            <img
                                src={`https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/images/ranked-emblems/Rank=${playerInfo.soloQueue.tier.toLowerCase()}.png`}
                                alt={`${playerInfo.soloQueue.tier} ${playerInfo.soloQueue.rank}`}
                                onError={(e) => {
                                    e.currentTarget.src = "/Logo.png";
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-2xl font-bold">
                                {playerInfo.soloQueue.tier} {playerInfo.soloQueue.rank}
                            </p>
                            <p className="text-lg">{playerInfo.soloQueue.leaguePoints} LP</p>
                            <p className="text-textSecondary">
                                {playerInfo.soloQueue.wins}W / {playerInfo.soloQueue.losses}L
                            </p>
                            <p className="text-textSecondary">Win Rate: {playerInfo.soloQueue.winRate}%</p>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 flex flex-row gap-4 items-center">
                        <div className="w-32 h-32">
                            <img
                                src="https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/images/ranked-emblems/Rank=unranked.png"
                                alt="Unranked"
                            />
                        </div>
                        <p className="text-textSecondary text-xl">Unranked</p>
                    </div>
                )}
            </section>

            <section className="bg-surface p-4">
                <h2 className="text-xl mb-4">
                    Histórico de Partidas
                    {loadingMatches && <span className="text-sm ml-2">(Carregando...)</span>}
                </h2>
                {matches.length > 0 ? (
                    <MatchHistory matches={matches} />
                ) : (
                    !loadingMatches && <p className="text-textSecondary">Nenhuma partida encontrada</p>
                )}
            </section>
        </main>
    );
}
