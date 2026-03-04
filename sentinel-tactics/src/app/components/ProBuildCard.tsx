"use client";

import { ProBuild } from "../services/proBuildsService";

interface ProBuildCardProps {
    build: ProBuild;
}

const DDRAGON = "https://ddragon.leagueoflegends.com/cdn/15.6.1/img";

function timeAgo(dateStr: string): string {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 60) return `${diffMin}min atrás`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d atrás`;
    return `${Math.floor(diffDays / 30)}m atrás`;
}

function formatDuration(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
}

function kdaRatio(k: number, d: number, a: number): string {
    if (d === 0) return "Perfect";
    return ((k + a) / d).toFixed(2);
}

export default function ProBuildCard({ build }: ProBuildCardProps) {
    const isWin = build.result === "Win";

    return (
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-surface border border-accent/30 rounded-md px-4 py-3 hover:bg-accent/20 transition">
            {/* Barra lateral Win/Loss */}
            <div
                className={`absolute left-0 top-0 h-full w-1 rounded-l-md ${isWin ? "bg-highlight" : "bg-red-500/60"}`}
            />

            {/* Champion + Player */}
            <div className="flex items-center gap-3 min-w-[200px] pl-2">
                <div className="h-12 w-12 rounded bg-accent/40 overflow-hidden flex-shrink-0">
                    {build.championIcon ? (
                        <img src={build.championIcon} alt={build.champion} className="w-full h-full object-cover" />
                    ) : (
                        <img
                            src={`${DDRAGON}/champion/${build.champion}.png`}
                            alt={build.champion}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "";
                                (e.target as HTMLImageElement).style.display = "none";
                            }}
                        />
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-textPrimary font-medium text-sm">{build.champion}</span>
                    <span className="text-xs text-textSecondary">{build.playerName}</span>
                    <span className="text-xs text-textSecondary/70">
                        {build.team} • {build.region}
                    </span>
                </div>
            </div>

            {/* Lane + Result */}
            <div className="flex items-center gap-4 min-w-[120px]">
                <span className="text-xs text-textSecondary capitalize bg-accent/30 px-2 py-1 rounded">
                    {build.lane}
                </span>
                <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                        isWin ? "bg-highlight/30 text-highlight" : "bg-red-500/20 text-red-400"
                    }`}
                >
                    {build.result}
                </span>
            </div>

            {/* KDA */}
            <div className="flex flex-col items-center min-w-[90px]">
                <span className="text-textPrimary text-sm font-medium">
                    {build.kills}/{build.deaths}/{build.assists}
                </span>
                <span className="text-xs text-textSecondary">
                    {kdaRatio(build.kills, build.deaths, build.assists)} KDA
                </span>
            </div>

            {/* Items */}
            <div className="flex items-center gap-1 flex-wrap min-w-[180px]">
                {build.items.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="h-8 w-8 rounded bg-accent/40 overflow-hidden">
                        {item.iconUrl ? (
                            <img src={item.iconUrl} alt={`Item ${item.id}`} className="w-full h-full object-cover" />
                        ) : item.id > 0 ? (
                            <img
                                src={`${DDRAGON}/item/${item.id}.png`}
                                alt={`Item ${item.id}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />
                        ) : (
                            <div className="w-full h-full bg-accent/20" />
                        )}
                    </div>
                ))}
            </div>

            {/* CS + Gold */}
            <div className="flex flex-col items-center min-w-[70px]">
                <span className="text-textPrimary text-sm">{build.cs} CS</span>
                <span className="text-xs text-textSecondary">{(build.goldEarned / 1000).toFixed(1)}k gold</span>
            </div>

            {/* Meta info */}
            <div className="flex flex-col items-end ml-auto min-w-[90px]">
                <span className="text-xs text-textSecondary">{formatDuration(build.gameDuration)}</span>
                <span className="text-xs text-textSecondary/70">Patch {build.patch}</span>
                <span className="text-xs text-textSecondary/50">{timeAgo(build.gameCreation)}</span>
            </div>
        </div>
    );
}
