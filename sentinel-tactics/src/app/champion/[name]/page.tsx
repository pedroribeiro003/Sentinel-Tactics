// app/champion/[name]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Button } from "../../components/Button";
import { fetchChampionDetails } from "../../services/championsService";
import { ChampionDetails } from "../../types/champions";

const LANES = [
    { value: "ALL", label: "Todas as Lanes", icon: "🎯" },
    { value: "TOP", label: "Top", icon: "⬆️" },
    { value: "JUNGLE", label: "Jungle", icon: "🌲" },
    { value: "MIDDLE", label: "Mid", icon: "⭐" },
    { value: "BOTTOM", label: "ADC", icon: "⬇️" },
    { value: "UTILITY", label: "Support", icon: "🛡️" },
];

// ============================================
// COMPONENTE STAT CARD
// ============================================
function StatCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className={`bg-surface p-6 rounded ${highlight ? "border-2 border-highlight" : ""}`}>
            <p className="text-sm text-textSecondary mb-2">{label}</p>
            <p className={`text-3xl font-bold ${highlight ? "text-highlight" : "text-textPrimary"}`}>{value}</p>
        </div>
    );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function ChampionPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const championName = params.name as string;
    const elo = searchParams.get("elo") || "PLATINUM";
    const lane = searchParams.get("lane") || "ALL";

    const [championData, setChampionData] = useState<ChampionDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadChampionDetails() {
            if (!championName) {
                setError("Nome do campeão não encontrado na URL");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const data = await fetchChampionDetails({
                    name: championName,
                    elo,
                    lane: lane === "ALL" ? undefined : lane,
                });
                setChampionData(data);
            } catch (err: any) {
                console.error("Erro ao buscar champion:", err);
                setError(err.message || "Erro ao buscar dados do campeão");
                setChampionData(null);
            } finally {
                setLoading(false);
            }
        }

        loadChampionDetails();
    }, [championName, elo, lane]);

    const handleLaneChange = (newLane: string) => {
        router.push(`/champion/${championName}?elo=${elo}&lane=${newLane}`);
    };

    const handleEloChange = (newElo: string) => {
        router.push(`/champion/${championName}?elo=${newElo}&lane=${lane}`);
    };

    if (loading) {
        return (
            <main className="p-4 flex justify-center items-center min-h-screen">
                <div className="text-2xl">Carregando dados do campeão...</div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="p-4 flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="text-2xl text-red-500">{error}</div>
                <Button variant="secondary" onClick={() => router.push("/")}>
                    Voltar para Início
                </Button>
            </main>
        );
    }

    if (!championData) {
        return (
            <main className="p-4 flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="text-2xl">Campeão não encontrado</div>
                <Button variant="secondary" onClick={() => router.push("/")}>
                    Voltar para Início
                </Button>
            </main>
        );
    }

    const currentLane = LANES.find((l) => l.value === lane);

    return (
        <main className="p-4 flex flex-col gap-8">
            {/* HEADER DO CAMPEÃO */}
            <section className="flex flex-row gap-4 bg-surface p-4 items-center">
                <div className="w-32 h-32">
                    <img
                        src={championData.champion.icon_url || "/placeholder-champion.png"}
                        alt={championData.champion.name}
                        className="rounded-full w-full h-full object-cover border-4 border-accent"
                    />
                </div>

                <div className="flex flex-col flex-1">
                    <h1 className="text-3xl font-bold">{championData.champion.name}</h1>
                    <p className="text-textSecondary">{championData.champion.title}</p>
                    <span className="text-textSecondary mt-2">
                        {elo} • {currentLane?.icon} {currentLane?.label}
                    </span>

                    <div className="py-2 flex gap-2">
                        {/* Seletor de Elo */}
                        <select
                            value={elo}
                            onChange={(e) => handleEloChange(e.target.value)}
                            className="px-3 py-2 bg-background text-text rounded text-sm"
                        >
                            <option value="IRON">Iron</option>
                            <option value="BRONZE">Bronze</option>
                            <option value="SILVER">Silver</option>
                            <option value="GOLD">Gold</option>
                            <option value="PLATINUM">Platinum</option>
                            <option value="DIAMOND">Diamond</option>
                        </select>

                        <Button variant="secondary" onClick={() => router.push("/")}>
                            Buscar Outro Champion
                        </Button>
                    </div>
                </div>

                {/* SELETOR DE LANE RÁPIDO */}
                <div className="flex flex-col gap-2">
                    <span className="text-xs text-textSecondary text-center">Trocar Lane:</span>
                    <div className="flex gap-2">
                        {LANES.map((l) => (
                            <button
                                key={l.value}
                                onClick={() => handleLaneChange(l.value)}
                                className={`w-10 h-10 rounded flex items-center justify-center text-xl transition ${
                                    lane === l.value ? "bg-highlight text-background" : "bg-background hover:bg-accent"
                                }`}
                                title={l.label}
                            >
                                {l.icon}
                            </button>
                        ))}
                    </div>
                </div>

                {/* TIER */}
                {championData.performance.tier && (
                    <div className="flex flex-col items-center bg-background p-4 rounded">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">{championData.performance.tier}</span>
                        </div>
                        <span className="text-sm font-medium mt-2 text-textSecondary">
                            Tier {championData.performance.tier}
                        </span>
                    </div>
                )}
            </section>

            {/* ESTATÍSTICAS GERAIS */}
            <section className="grid grid-cols-4 gap-4">
                <StatCard
                    label="Win Rate"
                    value={championData.performance.winrate ? `${championData.performance.winrate.toFixed(1)}%` : "N/A"}
                    highlight={(championData.performance.winrate || 0) >= 50}
                />
                <StatCard
                    label="Pick Rate"
                    value={
                        championData.performance.pickrate ? `${championData.performance.pickrate.toFixed(1)}%` : "N/A"
                    }
                />
                <StatCard
                    label="Ban Rate"
                    value={championData.performance.banrate ? `${championData.performance.banrate.toFixed(1)}%` : "N/A"}
                />
                <StatCard label="Partidas" value={championData.performance.games.toLocaleString()} />
            </section>

            {/* RUNAS */}
            {championData.runes && championData.runes.length > 0 && (
                <section className="bg-surface p-6 rounded">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">🔮 Runas Recomendadas</h2>
                        <div className="text-sm text-textSecondary">
                            WR:{" "}
                            <span className="text-highlight font-medium">
                                {championData.runes[0].winrate.toFixed(1)}%
                            </span>{" "}
                            • PR: <span className="font-medium">{championData.runes[0].pickrate.toFixed(1)}%</span> •{" "}
                            {championData.runes[0].games.toLocaleString()} jogos
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* PRIMARY TREE */}
                        <div className="bg-background p-4 rounded border-2 border-accent">
                            <h3 className="font-bold text-center mb-4 text-lg">Primary Tree</h3>
                            <div className="flex justify-center mb-4">
                                <div className="relative group">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 p-1">
                                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                                            <div className="text-2xl">🔥</div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-background border border-accent rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                                        Keystone: {championData.runes[0].primary.keystone}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                {championData.runes[0].primary.perks.map((perkId, index) => (
                                    <div key={index} className="flex items-center gap-3 group">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-accent p-1">
                                                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                                                    <div className="text-lg">⚡</div>
                                                </div>
                                            </div>
                                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-background border border-accent rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                                                Perk ID: {perkId}
                                            </div>
                                        </div>
                                        <span className="text-sm">Perk {perkId}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECONDARY TREE */}
                        <div className="bg-background p-4 rounded border-2 border-accent/50">
                            <h3 className="font-bold text-center mb-4 text-lg">Secondary Tree</h3>
                            <div className="flex flex-col gap-3 mt-12">
                                {championData.runes[0].secondary.perks.map((perkId, index) => (
                                    <div key={index} className="flex items-center gap-3 group">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-accent/50 p-1">
                                                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                                                    <div className="text-lg">✨</div>
                                                </div>
                                            </div>
                                            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-background border border-accent rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                                                Perk ID: {perkId}
                                            </div>
                                        </div>
                                        <span className="text-sm">Perk {perkId}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* STAT SHARDS */}
                    <div className="mt-6 bg-background p-4 rounded">
                        <h4 className="font-bold mb-3 text-center">Fragmentos de Estatística</h4>
                        <div className="flex justify-center gap-6">
                            {championData.runes[0].statShards.map((shardId, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 rounded bg-accent flex items-center justify-center text-lg">
                                        {index === 0 ? "⚡" : index === 1 ? "⚔️" : "❤️"}
                                    </div>
                                    <span className="text-xs text-center text-textSecondary">Shard {shardId}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* MELHORES BUILDS */}
            {championData.builds && championData.builds.length > 0 && (
                <section className="bg-surface p-6 rounded">
                    <h2 className="text-xl font-bold mb-4">🏆 Melhores Builds Completas</h2>
                    <div className="space-y-4">
                        {championData.builds.map((build, index) => (
                            <div
                                key={index}
                                className="bg-background p-4 rounded border-2 border-accent/30 hover:border-highlight/50 transition"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 className="font-bold text-lg">Build #{index + 1}</h3>
                                        <div className="flex gap-4 mt-1 text-sm">
                                            <span className="text-textSecondary">
                                                ✅ WR:{" "}
                                                <span className="text-highlight font-medium">
                                                    {build.winrate.toFixed(1)}%
                                                </span>
                                            </span>
                                            <span className="text-textSecondary">
                                                📊 PR: <span className="font-medium">{build.pickrate.toFixed(1)}%</span>
                                            </span>
                                            <span className="text-textSecondary">
                                                {build.games.toLocaleString()} jogos
                                            </span>
                                        </div>
                                    </div>
                                    {index === 0 && (
                                        <span className="bg-highlight text-background px-3 py-1 rounded-full text-xs font-bold">
                                            MAIS POPULAR
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-2 items-center">
                                    {build.items.map((itemId, itemIndex) => (
                                        <div key={itemIndex} className="relative group">
                                            <div className="w-14 h-14 bg-accent rounded border-2 border-accent overflow-hidden hover:border-highlight transition flex items-center justify-center">
                                                <span className="text-xs font-bold">{itemId}</span>
                                            </div>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-accent rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                                                Item {itemId}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* MELHORES ITEMS INDIVIDUAIS */}
            {championData.items && championData.items.length > 0 && (
                <section className="bg-surface p-6 rounded">
                    <h2 className="text-xl font-bold mb-4">📦 Melhores Items Individuais</h2>
                    <div className="space-y-3">
                        {championData.items.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 bg-background p-4 rounded hover:bg-accent/20 transition"
                            >
                                <div className="w-16 h-16 bg-accent rounded overflow-hidden flex-shrink-0 border-2 border-accent flex items-center justify-center">
                                    <span className="text-sm font-bold">{item.itemId}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-lg">{item.itemName || `Item ${item.itemId}`}</p>
                                    <div className="flex gap-4 mt-1">
                                        <span className="text-sm text-textSecondary">
                                            ✅ Win Rate:{" "}
                                            <span className="text-highlight font-medium">
                                                {item.winrate.toFixed(1)}%
                                            </span>
                                        </span>
                                        <span className="text-sm text-textSecondary">
                                            📊 Pick Rate:{" "}
                                            <span className="font-medium">{item.pickrate.toFixed(1)}%</span>
                                        </span>
                                        <span className="text-sm text-textSecondary">
                                            📍 Posição Média:{" "}
                                            <span className="font-medium">{item.avgPosition.toFixed(1)}</span>
                                        </span>
                                    </div>
                                </div>
                                <span className="text-sm text-textSecondary font-medium">
                                    {item.games.toLocaleString()} jogos
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* MATCHUPS */}
            {championData.matchups &&
                (championData.matchups.favorable.length > 0 || championData.matchups.difficult.length > 0) && (
                    <section className="bg-surface p-6 rounded">
                        <h2 className="text-xl font-bold mb-4">⚔️ Matchups</h2>
                        <div className="grid grid-cols-2 gap-8">
                            {championData.matchups.favorable.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold mb-4 text-green-500">✅ Favoráveis</h3>
                                    <div className="space-y-2">
                                        {championData.matchups.favorable.map((matchup, index) => (
                                            <div
                                                key={index}
                                                className="bg-background p-3 rounded-lg flex justify-between items-center hover:bg-accent/20 transition"
                                            >
                                                <span className="font-medium">{matchup.champion}</span>
                                                <div className="flex gap-3 items-center">
                                                    <span className="text-green-500 font-bold">
                                                        {matchup.winrate.toFixed(1)}%
                                                    </span>
                                                    <span className="text-xs text-textSecondary">
                                                        {matchup.games} jogos
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {championData.matchups.difficult.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold mb-4 text-red-500">❌ Difíceis</h3>
                                    <div className="space-y-2">
                                        {championData.matchups.difficult.map((matchup, index) => (
                                            <div
                                                key={index}
                                                className="bg-background p-3 rounded-lg flex justify-between items-center hover:bg-accent/20 transition"
                                            >
                                                <span className="font-medium">{matchup.champion}</span>
                                                <div className="flex gap-3 items-center">
                                                    <span className="text-red-500 font-bold">
                                                        {matchup.winrate.toFixed(1)}%
                                                    </span>
                                                    <span className="text-xs text-textSecondary">
                                                        {matchup.games} jogos
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

            {/* SUMMONER SPELLS */}
            {championData.summonerSpells && championData.summonerSpells.length > 0 && (
                <section className="bg-surface p-6 rounded">
                    <h2 className="text-xl font-bold mb-4">✨ Summoner Spells</h2>
                    <div className="space-y-3">
                        {championData.summonerSpells.map((spell, index) => (
                            <div key={index} className="flex items-center gap-4 bg-background p-4 rounded">
                                <div className="flex gap-2">
                                    <div className="w-12 h-12 bg-accent rounded flex items-center justify-center font-bold">
                                        {spell.spell1}
                                    </div>
                                    <div className="w-12 h-12 bg-accent rounded flex items-center justify-center font-bold">
                                        {spell.spell2}
                                    </div>
                                </div>
                                <div className="flex-1 flex gap-6">
                                    <span className="text-sm text-textSecondary">
                                        ✅ WR:{" "}
                                        <span className="text-highlight font-medium">{spell.winrate.toFixed(1)}%</span>
                                    </span>
                                    <span className="text-sm text-textSecondary">
                                        📊 PR: <span className="font-medium">{spell.pickrate.toFixed(1)}%</span>
                                    </span>
                                    <span className="text-sm text-textSecondary">
                                        {spell.games.toLocaleString()} jogos
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
