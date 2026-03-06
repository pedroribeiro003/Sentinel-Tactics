"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/Button";
import { fetchChampionDetails } from "../../services/championsService";
import { ChampionDetails } from "../../types/champions";
import { getSummonerSpellIcon, getRuneIcon } from "../../utils/ddragon";

const LaneIcon = ({ lane, active }: { lane: string; active: boolean }) => {
    const color = active ? "#fff" : "#8fa3b1";
    const size = 22;

    if (lane === "ALL")
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <text
                    x="12"
                    y="17"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="bold"
                    fill="#4fc3f7"
                    fontFamily="serif"
                >
                    ✦
                </text>
            </svg>
        );
    if (lane === "TOP")
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path d="M4 20 L4 4 L20 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M4 4 L20 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
                <rect x="13" y="13" width="7" height="7" rx="1" fill={color} opacity="0.5" />
            </svg>
        );
    if (lane === "JUNGLE")
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 3 C7 3 3 7 3 12 C3 17 7 21 12 21 C17 21 21 17 21 12"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M12 7 L12 12 L16 10"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <circle cx="18" cy="6" r="3" fill={color} opacity="0.6" />
            </svg>
        );
    if (lane === "MIDDLE")
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path d="M4 20 L20 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3" fill={color} />
            </svg>
        );
    if (lane === "BOTTOM")
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path d="M4 4 L20 4 L20 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M20 20 L4 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
                <rect x="4" y="13" width="7" height="7" rx="1" fill={color} opacity="0.5" />
            </svg>
        );
    if (lane === "UTILITY")
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 3 L14.5 9 L21 9.5 L16 14 L17.5 21 L12 17.5 L6.5 21 L8 14 L3 9.5 L9.5 9 Z"
                    stroke={color}
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    fill={color}
                    fillOpacity="0.2"
                />
            </svg>
        );
    return null;
};

const LANES = [
    { value: "ALL", label: "Todas as Lanes" },
    { value: "TOP", label: "Top" },
    { value: "JUNGLE", label: "Jungle" },
    { value: "MIDDLE", label: "Mid" },
    { value: "BOTTOM", label: "ADC" },
    { value: "UTILITY", label: "Support" },
];

function StatCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className={`bg-surface p-6 rounded ${highlight ? "border-2 border-highlight" : ""}`}>
            <p className="text-sm text-textSecondary mb-2">{label}</p>
            <p className={`text-3xl font-bold ${highlight ? "text-highlight" : "text-textPrimary"}`}>{value}</p>
        </div>
    );
}

function ItemIcon({ itemId, icon_url, name }: { itemId: number; icon_url?: string | null; name?: string }) {
    return (
        <div className="relative group">
            <div className="w-14 h-14 bg-accent rounded border-2 border-accent overflow-hidden hover:border-highlight transition">
                {icon_url ? (
                    <img
                        src={icon_url}
                        alt={name || `Item ${itemId}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs font-bold">{itemId}</span>
                    </div>
                )}
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-accent rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                {name || `Item ${itemId}`}
            </div>
        </div>
    );
}

function RuneIcon({ id, size = 12, ring = true }: { id: number; size?: number; ring?: boolean }) {
    const url = getRuneIcon(id);
    const sizeClass = `w-${size} h-${size}`;
    return (
        <div
            className={`${sizeClass} rounded-full ${
                ring ? "bg-accent p-1" : ""
            } overflow-hidden flex items-center justify-center flex-shrink-0`}
        >
            {url ? (
                <img src={url} alt={`Rune ${id}`} className="w-full h-full object-contain" />
            ) : (
                <span className="text-xs font-bold opacity-50">{id}</span>
            )}
        </div>
    );
}

function SpellIcon({ spellId }: { spellId: number }) {
    const url = getSummonerSpellIcon(spellId);
    return (
        <div className="w-12 h-12 rounded overflow-hidden border-2 border-accent flex items-center justify-center bg-accent">
            {url ? (
                <img src={url} alt={`Spell ${spellId}`} className="w-full h-full object-cover" />
            ) : (
                <span className="text-xs font-bold">{spellId}</span>
            )}
        </div>
    );
}

interface Props {
    params: { name: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function ChampionPage({ params, searchParams }: Props) {
    const router = useRouter();

    const championName = decodeURIComponent(params.name);
    const elo = searchParams.elo
        ? Array.isArray(searchParams.elo)
            ? searchParams.elo[0]
            : searchParams.elo
        : "PLATINUM";
    const lane = searchParams.lane
        ? Array.isArray(searchParams.lane)
            ? searchParams.lane[0]
            : searchParams.lane
        : "ALL";

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
                setError(err.message || "Erro ao buscar dados do campeão");
                setChampionData(null);
            } finally {
                setLoading(false);
            }
        }
        loadChampionDetails();
    }, [championName, elo, lane]);

    const handleLaneChange = (newLane: string) => {
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, v));
            } else if (value) {
                params.set(key, value);
            }
        });
        params.set("lane", newLane);
        router.push(`/champion/${championName}?${params.toString()}`);
    };
    const handleEloChange = (newElo: string) => {
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, v));
            } else if (value) {
                params.set(key, value);
            }
        });
        params.set("elo", newElo);
        router.push(`/champion/${championName}?${params.toString()}`);
    };

    if (loading)
        return (
            <main className="p-4 flex justify-center items-center min-h-screen">
                <div className="text-2xl">Carregando dados do campeão...</div>
            </main>
        );
    if (error)
        return (
            <main className="p-4 flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="text-2xl text-red-500">{error}</div>
                <Button variant="secondary" onClick={() => router.push("/")}>
                    Voltar para Início
                </Button>
            </main>
        );
    if (!championData)
        return (
            <main className="p-4 flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="text-2xl">Campeão não encontrado</div>
                <Button variant="secondary" onClick={() => router.push("/")}>
                    Voltar para Início
                </Button>
            </main>
        );

    const currentLane = LANES.find((l) => l.value === lane);
    const pct = (value: number | null) => (value != null ? `${value.toFixed(1)}%` : "N/A");

    return (
        <main className="p-4 flex flex-col gap-8">
            <section className="flex flex-row gap-4 bg-surface p-4 items-center">
                <div className="w-32 h-32 flex-shrink-0">
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
                        {elo} • {currentLane?.label}
                    </span>
                    <div className="py-2 flex gap-2">
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

                <div className="flex flex-col gap-2">
                    <span className="text-xs text-textSecondary text-center">Trocar Lane:</span>
                    <div className="flex gap-1">
                        {Array.isArray(LANES) &&
                            LANES.map((l) => {
                                const active = lane === l.value;
                                return (
                                    <button
                                        key={l.value}
                                        onClick={() => handleLaneChange(l.value)}
                                        title={l.label}
                                        className={`w-10 h-10 rounded flex items-center justify-center transition ${
                                            active ? "bg-highlight" : "bg-background hover:bg-accent"
                                        }`}
                                    >
                                        <LaneIcon lane={l.value} active={active} />
                                    </button>
                                );
                            })}
                    </div>
                </div>

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

            <section className="grid grid-cols-4 gap-4">
                <StatCard
                    label="Win Rate"
                    value={pct(championData.performance.winrate)}
                    highlight={(championData.performance.winrate || 0) >= 50}
                />
                <StatCard label="Pick Rate" value={pct(championData.performance.pickrate)} />
                <StatCard label="Ban Rate" value={pct(championData.performance.banrate)} />
                <StatCard label="Partidas" value={championData.performance.games.toLocaleString()} />
            </section>

            {championData.runes && Array.isArray(championData.runes) && championData.runes.length > 0 && (
                <section className="bg-surface p-6 rounded">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">🔮 Runas Recomendadas</h2>
                        <div className="text-sm text-textSecondary">
                            WR: <span className="text-highlight font-medium">{pct(championData.runes[0].winrate)}</span>{" "}
                            • PR: <span className="font-medium">{pct(championData.runes[0].pickrate)}</span> •{" "}
                            {championData.runes[0].games.toLocaleString()} jogos
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-background p-4 rounded border-2 border-accent">
                            <div className="flex items-center gap-3 mb-4">
                                <RuneIcon id={championData.runes[0].primary.style} size={8} ring={false} />
                                <h3 className="font-bold text-lg">Primary Tree</h3>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-16 h-16 rounded-full ring-2 ring-yellow-500 overflow-hidden flex items-center justify-center bg-accent flex-shrink-0">
                                    {getRuneIcon(championData.runes[0].primary.keystone) ? (
                                        <img
                                            src={getRuneIcon(championData.runes[0].primary.keystone)}
                                            alt="Keystone"
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-xs font-bold">
                                            {championData.runes[0].primary.keystone}
                                        </span>
                                    )}
                                </div>
                                <span className="text-sm font-medium text-textSecondary">Keystone</span>
                            </div>
                            <div className="flex flex-col gap-3">
                                {championData.runes[0].primary.perks &&
                                    Array.isArray(championData.runes[0].primary.perks) &&
                                    championData.runes[0].primary.perks.map((perkId, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <RuneIcon id={perkId} size={10} />
                                            <span className="text-sm text-textSecondary">Perk {index + 1}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="bg-background p-4 rounded border-2 border-accent/50">
                            <div className="flex items-center gap-3 mb-4">
                                <RuneIcon id={championData.runes[0].secondary.style} size={8} ring={false} />
                                <h3 className="font-bold text-lg">Secondary Tree</h3>
                            </div>
                            <div className="flex flex-col gap-3 mt-6">
                                {championData.runes[0].secondary.perks &&
                                    Array.isArray(championData.runes[0].secondary.perks) &&
                                    championData.runes[0].secondary.perks.map((perkId, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <RuneIcon id={perkId} size={10} />
                                            <span className="text-sm text-textSecondary">Perk {index + 1}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-background p-4 rounded">
                        <h4 className="font-bold mb-3 text-center">Fragmentos de Estatística</h4>
                        <div className="flex justify-center gap-8">
                            {championData.runes[0].statShards &&
                                Array.isArray(championData.runes[0].statShards) &&
                                championData.runes[0].statShards.map((shardId, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2">
                                        <RuneIcon id={shardId} size={10} />
                                        <span className="text-xs text-textSecondary">Shard {index + 1}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            )}

            {championData.summonerSpells &&
                Array.isArray(championData.summonerSpells) &&
                championData.summonerSpells.length > 0 && (
                    <section className="bg-surface p-6 rounded">
                        <h2 className="text-xl font-bold mb-4">✨ Summoner Spells</h2>
                        <div className="space-y-3">
                            {championData.summonerSpells.map((spell, index) => (
                                <div key={index} className="flex items-center gap-4 bg-background p-4 rounded">
                                    <div className="flex gap-2">
                                        <SpellIcon spellId={spell.spell1} />
                                        <SpellIcon spellId={spell.spell2} />
                                    </div>
                                    <div className="flex-1 flex gap-6">
                                        <span className="text-sm text-textSecondary">
                                            ✅ WR:{" "}
                                            <span className="text-highlight font-medium">{pct(spell.winrate)}</span>
                                        </span>
                                        <span className="text-sm text-textSecondary">
                                            📊 PR: <span className="font-medium">{pct(spell.pickrate)}</span>
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

            {championData.builds && Array.isArray(championData.builds) && championData.builds.length > 0 && (
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
                                                <span className="text-highlight font-medium">{pct(build.winrate)}</span>
                                            </span>
                                            <span className="text-textSecondary">
                                                📊 PR: <span className="font-medium">{pct(build.pickrate)}</span>
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
                                    {build.items &&
                                        Array.isArray(build.items) &&
                                        build.items.map((item, itemIndex) => (
                                            <ItemIcon key={itemIndex} itemId={item.itemId} icon_url={item.icon_url} />
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {championData.items && Array.isArray(championData.items) && championData.items.length > 0 && (
                <section className="bg-surface p-6 rounded">
                    <h2 className="text-xl font-bold mb-4">📦 Melhores Items Individuais</h2>
                    <div className="space-y-3">
                        {championData.items.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 bg-background p-4 rounded hover:bg-accent/20 transition"
                            >
                                <div className="flex-shrink-0">
                                    <ItemIcon
                                        itemId={item.itemId}
                                        icon_url={item.icon_url}
                                        name={item.itemName ?? undefined}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex gap-4 mt-1">
                                        <span className="text-sm text-textSecondary">
                                            ✅ Win Rate:{" "}
                                            <span className="text-highlight font-medium">{pct(item.winrate)}</span>
                                        </span>
                                        <span className="text-sm text-textSecondary">
                                            📊 Pick Rate: <span className="font-medium">{pct(item.pickrate)}</span>
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

            {championData.matchups &&
                ((Array.isArray(championData.matchups.favorable) && championData.matchups.favorable.length > 0) ||
                    (Array.isArray(championData.matchups.difficult) && championData.matchups.difficult.length > 0)) && (
                    <section className="bg-surface p-6 rounded">
                        <h2 className="text-xl font-bold mb-4">⚔️ Matchups</h2>
                        <div className="grid grid-cols-2 gap-8">
                            {Array.isArray(championData.matchups.favorable) &&
                                championData.matchups.favorable.length > 0 && (
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
                                                            {pct(matchup.winrate)}
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
                            {Array.isArray(championData.matchups.difficult) &&
                                championData.matchups.difficult.length > 0 && (
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
                                                            {pct(matchup.winrate)}
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
        </main>
    );
}
