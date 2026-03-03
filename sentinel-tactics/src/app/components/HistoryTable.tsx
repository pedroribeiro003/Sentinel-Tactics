"use client";

import { useState } from "react";

type Match = {
    id: string;
    champion: {
        id: number;
        name: string;
        iconUrl: string | null;
        level: number;
    };
    result: "Win" | "Loss";
    duration: string;
    gameDuration?: string;
    gameDurationSeconds?: number;
    gameMode?: string;
    queueId?: number;
    patch?: string;

    kda?: string;
    kills?: number;
    deaths?: number;
    assists?: number;
    kdaRatio?: string;
    cs?: number;
    csPerMinute?: string;
    gold?: string;
    goldEarned?: number;
    goldPerMinute?: string;
    role?: string;

    damageDealt?: {
        total: number;
        physical: number;
        magic: number;
        trueDamage: number;
    };

    vision?: {
        score: number;
        wardsPlaced: number;
        wardsKilled: number;
        controlWardsBought: number;
    };

    items?: Array<{
        id: number;
        iconUrl: string | null;
    }>;

    summonerSpells?: any[];
    runes?: any;
    multikills?: any;
    structures?: any;
    badges?: string[];
    participants?: any[];
    source?: string;
};

interface Props {
    matches: Match[];
}

const PAGE_SIZE = 10;

export function MatchHistory({ matches }: Props) {
    const [open, setOpen] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const visibleMatches = matches.slice(0, visibleCount);

    return (
        <div className="space-y-3">
            {visibleMatches.map((match) => {
                const isWin = match.result === "Win";
                const isOpen = open === match.id;

                return (
                    <div key={match.id}>
                        {/* CARD */}
                        <div
                            onClick={() => setOpen(isOpen ? null : match.id)}
                            className="relative flex items-center justify-between bg-surface border border-accent/30 rounded-md px-4 py-3 hover:bg-accent/20 transition cursor-pointer"
                        >
                            {/* Barra Win/Loss */}
                            <div
                                className={`absolute left-0 top-0 h-full w-1 rounded-l-md ${
                                    isWin ? "bg-highlight" : "bg-accent"
                                }`}
                            />

                            {/* Champion */}
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded bg-accent/40 overflow-hidden">
                                    {match.champion.iconUrl ? (
                                        <img
                                            src={match.champion.iconUrl}
                                            alt={match.champion.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-accent/40" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-textPrimary font-medium">{match.champion.name}</span>
                                    <span className="text-xs text-textSecondary">Level {match.champion.level}</span>
                                </div>
                            </div>

                            {/* Result + Duration */}
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end">
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded ${
                                            isWin ? "bg-highlight/30 text-highlight" : "bg-accent/40 text-textSecondary"
                                        }`}
                                    >
                                        {match.result}
                                    </span>
                                    {match.kda && <span className="text-xs text-textSecondary mt-1">{match.kda}</span>}
                                </div>

                                <span className="text-sm text-textSecondary tabular-nums">{match.duration}</span>
                            </div>
                        </div>

                        {/* EXPANSÃO */}
                        {isOpen && (
                            <div className="bg-background border border-t-0 border-accent/30 rounded-b-md px-6 py-4 animate-fadeIn">
                                <div className="grid grid-cols-3 gap-6 text-sm">
                                    <Detail label="KDA" value={match.kda ?? "-"} />
                                    <Detail label="KDA Ratio" value={match.kdaRatio ?? "-"} />
                                    <Detail
                                        label="CS"
                                        value={match.cs ? `${match.cs} (${match.csPerMinute}/min)` : "-"}
                                    />
                                    <Detail label="Gold" value={match.gold ?? "-"} />
                                    <Detail
                                        label="Damage"
                                        value={match.damageDealt ? match.damageDealt.total.toLocaleString() : "-"}
                                    />
                                    <Detail label="Vision" value={match.vision ? String(match.vision.score) : "-"} />
                                    <Detail label="Role" value={match.role ?? "-"} />
                                    <Detail label="Patch" value={match.patch ?? "-"} />
                                    <Detail label="Source" value={match.source ?? "-"} />
                                </div>

                                {/* Items */}
                                {match.items && match.items.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-xs text-textSecondary mb-2">Items</p>
                                        <div className="flex gap-2">
                                            {match.items.map((item, i) => (
                                                <div
                                                    key={`${item.id}-${i}`}
                                                    className="h-10 w-10 rounded bg-surface border border-accent/40 overflow-hidden"
                                                >
                                                    {item.iconUrl ? (
                                                        <img
                                                            src={item.iconUrl}
                                                            alt={`Item ${item.id}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-accent/40 flex items-center justify-center text-xs text-textSecondary">
                                                            {item.id}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Badges */}
                                {match.badges && match.badges.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-xs text-textSecondary mb-2">Badges</p>
                                        <div className="flex gap-2 flex-wrap">
                                            {match.badges.map((badge, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 text-xs bg-highlight/20 text-highlight rounded"
                                                >
                                                    {badge.replace(/_/g, " ")}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* BOTÃO MOSTRAR MAIS */}
            {visibleCount < matches.length && (
                <button
                    onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                    className="w-full mt-4 py-2 rounded-md bg-accent text-textPrimary text-sm font-medium hover:bg-accentHover transition"
                >
                    Mostrar mais ({matches.length - visibleCount} restantes)
                </button>
            )}
        </div>
    );
}

function Detail({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs text-textSecondary">{label}</p>
            <p className="text-textPrimary font-medium">{value}</p>
        </div>
    );
}
