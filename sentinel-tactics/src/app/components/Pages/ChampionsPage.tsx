"use client";
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Button } from "../../components/Button";
import { fetchChampionDetails } from "../../services/championsService";
import { ChampionDetails } from "../../types/champions";
import { getSummonerSpellIcon, getRuneIcon } from "../../utils/ddragon";

// =====================================================
// TIER SVG (igual à TierList)
// =====================================================
const TierSVG = ({ tier, size = 40 }: { tier: string; size?: number }) => {
    const s = size;
    const cx = s / 2;
    const cy = s / 2;
    const r = s * 0.42;
    const uid = `${tier}${size}`;
    const gradId = `grad-${uid}`;
    const glowId = `glow-${uid}`;
    const shineId = `shine-${uid}`;

    type Cfg = {
        bg: [string, string];
        stroke: string;
        glow: boolean;
        innerDetail: boolean;
        letterColor: string;
        letterOpacity: number;
        opacity: number;
    };
    const cfgMap: Record<string, Cfg> = {
        S: {
            bg: ["#e0f7ff", "#0284c7"],
            stroke: "#7dd3fc",
            glow: true,
            innerDetail: true,
            letterColor: "#ffffff",
            letterOpacity: 1,
            opacity: 1,
        },
        A: {
            bg: ["#bae6fd", "#0369a1"],
            stroke: "#60a5fa",
            glow: true,
            innerDetail: true,
            letterColor: "#e0f2fe",
            letterOpacity: 0.95,
            opacity: 0.95,
        },
        B: {
            bg: ["#93c5fd", "#1d4ed8"],
            stroke: "#3b82f6",
            glow: false,
            innerDetail: true,
            letterColor: "#dbeafe",
            letterOpacity: 0.9,
            opacity: 0.85,
        },
        C: {
            bg: ["#60a5fa", "#1e40af"],
            stroke: "#3b82f6",
            glow: false,
            innerDetail: false,
            letterColor: "#bfdbfe",
            letterOpacity: 0.8,
            opacity: 0.7,
        },
        D: {
            bg: ["#475569", "#1e293b"],
            stroke: "#334155",
            glow: false,
            innerDetail: false,
            letterColor: "#94a3b8",
            letterOpacity: 0.6,
            opacity: 0.5,
        },
    };
    const cfg = cfgMap[tier];
    if (!cfg) return null;

    const hexPoints = (radius: number) =>
        Array.from({ length: 6 }, (_, i) => {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            return `${cx + radius * Math.cos(a)},${cy + radius * Math.sin(a)}`;
        }).join(" ");

    const Shape = ({ fill, stroke, strokeWidth }: { fill: string; stroke: string; strokeWidth: number }) => {
        if (tier === "S")
            return <polygon points={hexPoints(r)} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
        if (tier === "A")
            return (
                <polygon
                    points={`${cx},${cy - r} ${cx + r * 0.75},${cy} ${cx},${cy + r} ${cx - r * 0.75},${cy}`}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                />
            );
        if (tier === "B")
            return (
                <path
                    d={`M${cx},${cy - r} L${cx + r * 0.8},${cy - r * 0.35} L${cx + r * 0.8},${cy + r * 0.2} Q${
                        cx + r * 0.8
                    },${cy + r * 0.75} ${cx},${cy + r} Q${cx - r * 0.8},${cy + r * 0.75} ${cx - r * 0.8},${
                        cy + r * 0.2
                    } L${cx - r * 0.8},${cy - r * 0.35} Z`}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                />
            );
        return <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
    };
    const ShineShape = ({ fill }: { fill: string }) => {
        if (tier === "S") return <polygon points={hexPoints(r)} fill={fill} stroke="none" />;
        if (tier === "A")
            return (
                <polygon
                    points={`${cx},${cy - r} ${cx + r * 0.75},${cy} ${cx},${cy + r} ${cx - r * 0.75},${cy}`}
                    fill={fill}
                    stroke="none"
                />
            );
        if (tier === "B")
            return (
                <path
                    d={`M${cx},${cy - r} L${cx + r * 0.8},${cy - r * 0.35} L${cx + r * 0.8},${cy + r * 0.2} Q${
                        cx + r * 0.8
                    },${cy + r * 0.75} ${cx},${cy + r} Q${cx - r * 0.8},${cy + r * 0.75} ${cx - r * 0.8},${
                        cy + r * 0.2
                    } L${cx - r * 0.8},${cy - r * 0.35} Z`}
                    fill={fill}
                    stroke="none"
                />
            );
        return <circle cx={cx} cy={cy} r={r} fill={fill} stroke="none" />;
    };

    return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={{ opacity: cfg.opacity }}>
            <defs>
                <radialGradient id={gradId} cx="40%" cy="30%" r="70%">
                    <stop offset="0%" stopColor={cfg.bg[0]} />
                    <stop offset="100%" stopColor={cfg.bg[1]} />
                </radialGradient>
                {cfg.glow && (
                    <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation={s * 0.07} result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                )}
                {cfg.innerDetail && (
                    <radialGradient id={shineId} cx="35%" cy="25%" r="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </radialGradient>
                )}
            </defs>
            <g filter={cfg.glow ? `url(#${glowId})` : undefined}>
                <Shape fill={`url(#${gradId})`} stroke={cfg.stroke} strokeWidth={s * 0.03} />
            </g>
            {cfg.innerDetail && <ShineShape fill={`url(#${shineId})`} />}
            {tier === "S" && (
                <polygon points={hexPoints(r * 0.6)} fill="none" stroke="white" strokeWidth={s * 0.015} opacity="0.2" />
            )}
            {tier === "A" && (
                <polygon
                    points={`${cx},${cy - r * 0.55} ${cx + r * 0.42},${cy} ${cx},${cy + r * 0.55} ${
                        cx - r * 0.42
                    },${cy}`}
                    fill="none"
                    stroke="white"
                    strokeWidth={s * 0.015}
                    opacity="0.2"
                />
            )}
            <text
                x={cx}
                y={cy + s * 0.13}
                textAnchor="middle"
                fontSize={s * 0.38}
                fontWeight="900"
                fontFamily="'Arial Black', sans-serif"
                fill={cfg.letterColor}
                opacity={cfg.letterOpacity}
                style={{ userSelect: "none" }}
            >
                {tier}
            </text>
            {(tier === "S" || tier === "A") && (
                <circle cx={cx - r * 0.2} cy={cy - r * 0.45} r={s * 0.045} fill="white" opacity="0.7" />
            )}
        </svg>
    );
};

// =====================================================
// LANE ICONS
// =====================================================
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

// =====================================================
// STAT CARD
// =====================================================
function StatCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className={`bg-surface p-3 sm:p-6 rounded ${highlight ? "border-2 border-highlight" : ""}`}>
            <p className="text-xs sm:text-sm text-textSecondary mb-1 sm:mb-2">{label}</p>
            <p className={`text-xl sm:text-3xl font-bold ${highlight ? "text-highlight" : "text-textPrimary"}`}>
                {value}
            </p>
        </div>
    );
}

// =====================================================
// ITEM ICON
// =====================================================
function ItemIcon({ itemId, icon_url, name }: { itemId: number; icon_url?: string | null; name?: string }) {
    return (
        <div className="relative group">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-accent rounded border-2 border-accent overflow-hidden hover:border-highlight transition">
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

// =====================================================
// RUNE ICON
// =====================================================
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

// =====================================================
// SPELL ICON
// =====================================================
function SpellIcon({ spellId }: { spellId: number }) {
    const url = getSummonerSpellIcon(spellId);
    return (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded overflow-hidden border-2 border-accent flex items-center justify-center bg-accent">
            {url ? (
                <img src={url} alt={`Spell ${spellId}`} className="w-full h-full object-cover" />
            ) : (
                <span className="text-xs font-bold">{spellId}</span>
            )}
        </div>
    );
}

// =====================================================
// MAIN PAGE
// =====================================================
export default function ChampionPage() {
    console.log("🏆 ChampionPage montou");
    const params = useParams();
    console.log("params:", params);
    const searchParams = useSearchParams();
    const router = useRouter();

    const championName = decodeURIComponent(params?.name as string);
    const elo = searchParams?.get("elo") || "PLATINUM";
    const lane = searchParams?.get("lane") || "ALL";

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
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Erro ao buscar dados do campeão");
                setChampionData(null);
            } finally {
                setLoading(false);
            }
        }
        loadChampionDetails();
    }, [championName, elo, lane]);

    const handleLaneChange = (newLane: string) => router.push(`/champion/${championName}?elo=${elo}&lane=${newLane}`);
    const handleEloChange = (newElo: string) => router.push(`/champion/${championName}?elo=${newElo}&lane=${lane}`);
    const pct = (value: number | null | undefined) => (value != null ? `${value.toFixed(1)}%` : "N/A");

    if (loading)
        return (
            <main className="p-4 flex justify-center items-center min-h-[60vh]">
                <div className="text-xl">Carregando dados do campeão...</div>
            </main>
        );
    if (error)
        return (
            <main className="p-4 flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="text-xl text-red-500">{error}</div>
                <Button variant="secondary" onClick={() => router.push("/")}>
                    Voltar para Início
                </Button>
            </main>
        );
    if (!championData)
        return (
            <main className="p-4 flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="text-xl">Campeão não encontrado</div>
                <Button variant="secondary" onClick={() => router.push("/")}>
                    Voltar para Início
                </Button>
            </main>
        );

    const currentLane = LANES.find((l) => l.value === lane);

    return (
        <main className="p-2 sm:p-4 flex flex-col gap-4 sm:gap-8">
            {/* HEADER */}
            <section className="bg-surface p-3 sm:p-4 rounded flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
                {/* Avatar + Tier lado a lado no mobile */}
                <div className="flex items-center gap-3">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0">
                        <img
                            src={championData.champion.icon_url || "/placeholder-champion.png"}
                            alt={championData.champion.name}
                            className="rounded-full w-full h-full object-cover border-4 border-accent"
                        />
                    </div>
                    {/* Tier — visível só no mobile aqui */}
                    {championData.performance.tier && (
                        <div className="flex flex-col items-center sm:hidden">
                            <TierSVG tier={championData.performance.tier} size={64} />
                            <span className="text-xs text-textSecondary mt-1">
                                Tier {championData.performance.tier}
                            </span>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 gap-2">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">{championData.champion.name}</h1>
                        <p className="text-textSecondary text-sm">{championData.champion.title}</p>
                        <span className="text-textSecondary text-xs sm:text-sm">
                            {elo} • {currentLane?.label}
                        </span>
                    </div>

                    {/* Elo selector + back */}
                    <div className="flex gap-2 flex-wrap">
                        <select
                            value={elo}
                            onChange={(e) => handleEloChange(e.target.value)}
                            className="px-2 py-1.5 bg-background text-text rounded text-sm"
                        >
                            <option value="IRON">Iron</option>
                            <option value="BRONZE">Bronze</option>
                            <option value="SILVER">Silver</option>
                            <option value="GOLD">Gold</option>
                            <option value="PLATINUM">Platinum</option>
                            <option value="DIAMOND">Diamond</option>
                        </select>
                        <Button variant="secondary" onClick={() => router.push("/")}>
                            ← Voltar
                        </Button>
                    </div>

                    {/* Lane selector */}
                    <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-xs text-textSecondary mr-1">Lane:</span>
                        {LANES.map((l) => {
                            const active = lane === l.value;
                            return (
                                <button
                                    key={l.value}
                                    onClick={() => handleLaneChange(l.value)}
                                    title={l.label}
                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded flex items-center justify-center transition ${
                                        active ? "bg-highlight" : "bg-background hover:bg-accent"
                                    }`}
                                >
                                    <LaneIcon lane={l.value} active={active} />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tier — só desktop */}
                {championData.performance.tier && (
                    <div className="hidden sm:flex flex-col items-center bg-background p-4 rounded">
                        <TierSVG tier={championData.performance.tier} size={80} />
                        <span className="text-sm font-medium mt-2 text-textSecondary">
                            Tier {championData.performance.tier}
                        </span>
                    </div>
                )}
            </section>

            {/* ESTATÍSTICAS */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                <StatCard
                    label="Win Rate"
                    value={pct(championData.performance.winrate)}
                    highlight={(championData.performance.winrate ?? 0) >= 50}
                />
                <StatCard label="Pick Rate" value={pct(championData.performance.pickrate)} />
                <StatCard label="Ban Rate" value={pct(championData.performance.banrate)} />
                <StatCard label="Partidas" value={championData.performance.games.toLocaleString()} />
            </section>

            {/* RUNAS */}
            {championData.runes && championData.runes.length > 0 && (
                <section className="bg-surface p-3 sm:p-6 rounded">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                        <h2 className="text-lg sm:text-xl font-bold">🔮 Runas Recomendadas</h2>
                        <div className="text-xs sm:text-sm text-textSecondary">
                            WR: <span className="text-highlight font-medium">{pct(championData.runes[0].winrate)}</span>{" "}
                            • PR: <span className="font-medium">{pct(championData.runes[0].pickrate)}</span> •{" "}
                            {championData.runes[0].games.toLocaleString()} jogos
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* PRIMARY */}
                        <div className="bg-background p-3 sm:p-4 rounded border-2 border-accent">
                            <div className="flex items-center gap-3 mb-3">
                                <RuneIcon id={championData.runes[0].primary.style} size={8} ring={false} />
                                <h3 className="font-bold">Primary Tree</h3>
                            </div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-14 h-14 rounded-full ring-2 ring-yellow-500 overflow-hidden flex items-center justify-center bg-accent flex-shrink-0">
                                    {getRuneIcon(championData.runes[0].primary.keystone) ? (
                                        <img
                                            src={getRuneIcon(championData.runes[0].primary.keystone)!}
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
                            <div className="flex flex-col gap-2">
                                {championData.runes[0].primary.perks.map((perkId, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <RuneIcon id={perkId} size={10} />
                                        <span className="text-sm text-textSecondary">Perk {index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECONDARY */}
                        <div className="bg-background p-3 sm:p-4 rounded border-2 border-accent/50">
                            <div className="flex items-center gap-3 mb-3">
                                <RuneIcon id={championData.runes[0].secondary.style} size={8} ring={false} />
                                <h3 className="font-bold">Secondary Tree</h3>
                            </div>
                            <div className="flex flex-col gap-2 mt-4">
                                {championData.runes[0].secondary.perks.map((perkId, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <RuneIcon id={perkId} size={10} />
                                        <span className="text-sm text-textSecondary">Perk {index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* STAT SHARDS */}
                    <div className="mt-4 bg-background p-3 sm:p-4 rounded">
                        <h4 className="font-bold mb-3 text-center text-sm">Fragmentos de Estatística</h4>
                        <div className="flex justify-center gap-6 sm:gap-8">
                            {championData.runes[0].statShards.map((shardId, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <RuneIcon id={shardId} size={10} />
                                    <span className="text-xs text-textSecondary">Shard {index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* SUMMONER SPELLS */}
            {championData.summonerSpells && championData.summonerSpells.length > 0 && (
                <section className="bg-surface p-3 sm:p-6 rounded">
                    <h2 className="text-lg sm:text-xl font-bold mb-3">✨ Summoner Spells</h2>
                    <div className="space-y-2">
                        {championData.summonerSpells.map((spell, index) => (
                            <div key={index} className="flex items-center gap-3 bg-background p-3 rounded">
                                <div className="flex gap-2">
                                    <SpellIcon spellId={spell.spell1} />
                                    <SpellIcon spellId={spell.spell2} />
                                </div>
                                <div className="flex flex-wrap gap-3 sm:gap-6">
                                    <span className="text-xs sm:text-sm text-textSecondary">
                                        WR: <span className="text-highlight font-medium">{pct(spell.winrate)}</span>
                                    </span>
                                    <span className="text-xs sm:text-sm text-textSecondary">
                                        PR: <span className="font-medium">{pct(spell.pickrate)}</span>
                                    </span>
                                    <span className="text-xs sm:text-sm text-textSecondary">
                                        {spell.games.toLocaleString()} jogos
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* BUILDS */}
            {championData.builds && championData.builds.length > 0 && (
                <section className="bg-surface p-3 sm:p-6 rounded">
                    <h2 className="text-lg sm:text-xl font-bold mb-3">🏆 Melhores Builds</h2>
                    <div className="space-y-3">
                        {championData.builds.map((build, index) => (
                            <div
                                key={index}
                                className="bg-background p-3 sm:p-4 rounded border-2 border-accent/30 hover:border-highlight/50 transition"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h3 className="font-bold">Build #{index + 1}</h3>
                                        <div className="flex flex-wrap gap-2 sm:gap-4 mt-1 text-xs sm:text-sm">
                                            <span className="text-textSecondary">
                                                WR:{" "}
                                                <span className="text-highlight font-medium">{pct(build.winrate)}</span>
                                            </span>
                                            <span className="text-textSecondary">
                                                PR: <span className="font-medium">{pct(build.pickrate)}</span>
                                            </span>
                                            <span className="text-textSecondary">
                                                {build.games.toLocaleString()} jogos
                                            </span>
                                        </div>
                                    </div>
                                    {index === 0 && (
                                        <span className="bg-highlight text-background px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0">
                                            POPULAR
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-1 flex-wrap">
                                    {build.items.map((item, itemIndex) => (
                                        <ItemIcon key={itemIndex} itemId={item.itemId} icon_url={item.icon_url} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ITEMS INDIVIDUAIS */}
            {championData.items && championData.items.length > 0 && (
                <section className="bg-surface p-3 sm:p-6 rounded">
                    <h2 className="text-lg sm:text-xl font-bold mb-3">📦 Melhores Items</h2>
                    <div className="space-y-2">
                        {championData.items.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 bg-background p-2 sm:p-4 rounded hover:bg-accent/20 transition"
                            >
                                <ItemIcon
                                    itemId={item.itemId}
                                    icon_url={item.icon_url}
                                    name={item.itemName ?? undefined}
                                />
                                <div className="flex-1 flex flex-wrap gap-2 sm:gap-4">
                                    <span className="text-xs sm:text-sm text-textSecondary">
                                        WR: <span className="text-highlight font-medium">{pct(item.winrate)}</span>
                                    </span>
                                    <span className="text-xs sm:text-sm text-textSecondary">
                                        PR: <span className="font-medium">{pct(item.pickrate)}</span>
                                    </span>
                                    <span className="text-xs sm:text-sm text-textSecondary hidden sm:inline">
                                        Pos: <span className="font-medium">{item.avgPosition.toFixed(1)}</span>
                                    </span>
                                </div>
                                <span className="text-xs text-textSecondary font-medium flex-shrink-0">
                                    {item.games.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* MATCHUPS */}
            {championData.matchups &&
                (championData.matchups.favorable.length > 0 || championData.matchups.difficult.length > 0) && (
                    <section className="bg-surface p-3 sm:p-6 rounded">
                        <h2 className="text-lg sm:text-xl font-bold mb-3">⚔️ Matchups</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                            {championData.matchups.favorable.length > 0 && (
                                <div>
                                    <h3 className="font-bold mb-3 text-green-500">✅ Favoráveis</h3>
                                    <div className="space-y-2">
                                        {championData.matchups.favorable.map((matchup, index) => (
                                            <div
                                                key={index}
                                                className="bg-background p-2 sm:p-3 rounded-lg flex justify-between items-center hover:bg-accent/20 transition"
                                            >
                                                <span className="font-medium text-sm">{matchup.champion}</span>
                                                <div className="flex gap-2 sm:gap-3 items-center">
                                                    <span className="text-green-500 font-bold text-sm">
                                                        {pct(matchup.winrate)}
                                                    </span>
                                                    <span className="text-xs text-textSecondary hidden sm:inline">
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
                                    <h3 className="font-bold mb-3 text-red-500">❌ Difíceis</h3>
                                    <div className="space-y-2">
                                        {championData.matchups.difficult.map((matchup, index) => (
                                            <div
                                                key={index}
                                                className="bg-background p-2 sm:p-3 rounded-lg flex justify-between items-center hover:bg-accent/20 transition"
                                            >
                                                <span className="font-medium text-sm">{matchup.champion}</span>
                                                <div className="flex gap-2 sm:gap-3 items-center">
                                                    <span className="text-red-500 font-bold text-sm">
                                                        {pct(matchup.winrate)}
                                                    </span>
                                                    <span className="text-xs text-textSecondary hidden sm:inline">
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
