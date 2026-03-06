import React from "react";
import Image from "next/image";
// =====================================================
// TIER SVG
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

    // Shape principal por tier
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

    // Shine overlay (mesma shape sem stroke)
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

            {/* Shape base com glow */}
            <g filter={cfg.glow ? `url(#${glowId})` : undefined}>
                <Shape fill={`url(#${gradId})`} stroke={cfg.stroke} strokeWidth={s * 0.03} />
            </g>

            {/* Shine */}
            {cfg.innerDetail && <ShineShape fill={`url(#${shineId})`} />}

            {/* Borda interna S */}
            {tier === "S" && (
                <polygon points={hexPoints(r * 0.6)} fill="none" stroke="white" strokeWidth={s * 0.015} opacity="0.2" />
            )}
            {/* Borda interna A */}
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

            {/* Letra */}
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

            {/* Ponto de luz S e A */}
            {(tier === "S" || tier === "A") && (
                <circle cx={cx - r * 0.2} cy={cy - r * 0.45} r={s * 0.045} fill="white" opacity="0.7" />
            )}
        </svg>
    );
};

// =====================================================
// TABELA
// =====================================================
export type ChampionRow = {
    id: string;
    name: string;
    image: string;
    tierImage?: string;
    tier?: string;
    lane: string;
    winRate: number;
    pickRate: number;
    banRate: number;
    games: number;
};

type ChampionTableProps = {
    data: ChampionRow[];
    onChampionClick?: (champion: ChampionRow) => void;
};

export default function ChampionTable({ data, onChampionClick }: ChampionTableProps) {
    return (
        <div className="overflow-hidden rounded-lg border border-accent">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 bg-surface px-4 py-3 text-sm text-textSecondary">
                <span>Champion</span>
                <span>Lane</span>
                <span>Tier</span>
                <span>Taxa de Vitória</span>
                <span>Taxa de Escolha</span>
                <span>Taxa de Banimento</span>
                <span>Jogos</span>
            </div>

            <div className="divide-y divide-accent/40">
                {Array.isArray(data) &&
                    data.map((champion, index) => (
                        <div
                            key={`${champion.id}-${index}`}
                            onClick={() => onChampionClick?.(champion)}
                            className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 px-4 py-4 hover:bg-surface/60 transition ${
                                onChampionClick ? "cursor-pointer" : ""
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                {/* Trocar Image por img para compatibilidade com imagens externas */}
                                <img
                                    src={champion.image}
                                    alt={champion.name}
                                    className="w-10 h-10 rounded object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/placeholder-champion.png";
                                    }}
                                />
                                <span className="font-medium">{champion.name}</span>
                            </div>

                            <span className="text-sm text-textSecondary capitalize">{champion.lane}</span>

                            <div className="flex items-center">
                                <TierSVG tier={champion.tier ?? champion.tierImage ?? ""} size={36} />
                            </div>

                            <span>{(champion.winRate * 100).toFixed(2)}%</span>
                            <span>{(champion.pickRate * 100).toFixed(2)}%</span>
                            <span>{(champion.banRate * 100).toFixed(2)}%</span>
                            <span>{champion.games.toLocaleString()}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}
