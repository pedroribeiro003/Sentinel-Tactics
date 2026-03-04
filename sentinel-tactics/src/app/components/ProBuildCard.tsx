"use client";

import { ProBuild } from "../services/proBuildsService";

interface Props {
    build: ProBuild;
}

function timeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) return `${diffDay}d atrás`;
    if (diffHour > 0) return `${diffHour}h atrás`;
    if (diffMin > 0) return `${diffMin}m atrás`;
    return "agora";
}

const GOLD_K_THRESHOLD = 1000;

function formatGold(gold: number): string {
    if (gold >= GOLD_K_THRESHOLD) return `${(gold / GOLD_K_THRESHOLD).toFixed(1)}k`;
    return String(gold);
}

function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
}

export function ProBuildCard({ build }: Props) {
    const isWin = build.result === "Win";
    const kda = `${build.kills}/${build.deaths}/${build.assists}`;

    return (
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-surface border border-accent/30 rounded-md px-5 py-4 hover:bg-accent/10 transition">
            {/* Win/Loss bar */}
            <div
                className={`absolute left-0 top-0 h-full w-1 rounded-l-md ${
                    isWin ? "bg-highlight" : "bg-accent"
                }`}
            />

            {/* Player + Team */}
            <div className="flex flex-col min-w-[120px]">
                <span className="text-textPrimary font-semibold text-sm">{build.playerName}</span>
                <span className="text-xs text-textSecondary">{build.team}</span>
                <span className="text-xs text-textSecondary">{build.region}</span>
            </div>

            {/* Champion */}
            <div className="flex items-center gap-2 min-w-[130px]">
                <div className="h-10 w-10 rounded bg-accent/40 overflow-hidden flex-shrink-0">
                    {build.championIcon ? (
                        <img
                            src={build.championIcon}
                            alt={build.champion}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-accent/40" />
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-textPrimary text-sm font-medium">{build.champion}</span>
                    <span className="text-xs text-textSecondary">{build.lane}</span>
                </div>
            </div>

            {/* Result */}
            <div className="flex flex-col items-start min-w-[60px]">
                <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                        isWin
                            ? "bg-highlight/30 text-highlight"
                            : "bg-accent/40 text-textSecondary"
                    }`}
                >
                    {build.result}
                </span>
                <span className="text-xs text-textSecondary mt-1">{formatDuration(build.gameDuration)}</span>
            </div>

            {/* KDA */}
            <div className="flex flex-col min-w-[80px]">
                <span className="text-textPrimary text-sm font-medium tabular-nums">{kda}</span>
                <span className="text-xs text-textSecondary">KDA</span>
            </div>

            {/* Items */}
            <div className="flex gap-1 flex-wrap">
                {build.items.slice(0, 6).map((item, i) => (
                    <div
                        key={`${item.id}-${i}`}
                        className="h-8 w-8 rounded bg-accent/40 overflow-hidden border border-accent/40"
                    >
                        {item.iconUrl ? (
                            <img
                                src={item.iconUrl}
                                alt={`Item ${item.id}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-accent/40 flex items-center justify-center text-[10px] text-textSecondary">
                                {item.id}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* CS + Gold */}
            <div className="flex flex-col min-w-[70px]">
                <span className="text-textPrimary text-sm tabular-nums">{build.cs} CS</span>
                <span className="text-xs text-textSecondary">{formatGold(build.goldEarned)} gold</span>
            </div>

            {/* Patch + Time */}
            <div className="flex flex-col items-end ml-auto text-right">
                <span className="text-xs text-textSecondary">Patch {build.patch}</span>
                <span className="text-xs text-textSecondary mt-1">{timeAgo(build.gameCreation)}</span>
            </div>
        </div>
    );
}
