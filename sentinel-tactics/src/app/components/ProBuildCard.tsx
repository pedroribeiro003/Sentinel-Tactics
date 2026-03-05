"use client";

import { useState } from "react";
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

function RuneIcon({ runeId, size = 24 }: { runeId: number; size?: number }) {
    return (
        <div
            className="rounded bg-accent/40 overflow-hidden flex-shrink-0 flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            <img
                src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${runeId}.png`}
                alt={`Rune ${runeId}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    el.parentElement!.innerHTML = `<span class="text-[8px] text-textSecondary">${runeId}</span>`;
                }}
            />
        </div>
    );
}

function SummonerSpellIcon({ spellId, size = 24 }: { spellId: number; size?: number }) {
    return (
        <div className="rounded bg-accent/40 overflow-hidden flex-shrink-0" style={{ width: size, height: size }}>
            <img
                src={`${DDRAGON}/spell/${spellId}.png`}
                alt={`Spell ${spellId}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                }}
            />
        </div>
    );
}

export default function ProBuildCard({ build }: ProBuildCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const isWin = build.result === "Win";

    return (
        <div>
            {/* Row principal — clicável */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    relative grid grid-cols-[200px_100px_90px_220px_1fr_70px_100px] items-center gap-4
                    bg-surface border border-accent/30 rounded-md px-4 py-3
                    hover:bg-accent/20 transition cursor-pointer select-none
                    ${isOpen ? "rounded-b-none border-b-0" : ""}
                `}
            >
                {/* Barra lateral Win/Loss */}
                <div
                    className={`absolute left-0 top-0 h-full w-1 rounded-l-md ${
                        isWin ? "bg-highlight" : "bg-red-500/60"
                    }`}
                />

                {/* Champion + Player */}
                <div className="flex items-center gap-3 pl-2">
                    <div className="h-10 w-10 rounded bg-accent/40 overflow-hidden flex-shrink-0">
                        {build.championIcon ? (
                            <img src={build.championIcon} alt={build.champion} className="w-full h-full object-cover" />
                        ) : (
                            <img
                                src={`${DDRAGON}/champion/${build.champion}.png`}
                                alt={build.champion}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />
                        )}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-textPrimary font-medium text-sm truncate">{build.champion}</span>
                        <span className="text-xs text-textSecondary truncate">{build.playerName}</span>
                        <span className="text-xs text-textSecondary/70 truncate">
                            {build.team} • {build.region}
                        </span>
                    </div>
                </div>

                {/* Lane + Result */}
                <div className="flex items-center gap-2">
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
                <div className="flex flex-col items-center">
                    <span className="text-textPrimary text-sm font-medium">
                        {build.kills}/{build.deaths}/{build.assists}
                    </span>
                    <span className="text-xs text-textSecondary">
                        {kdaRatio(build.kills, build.deaths, build.assists)} KDA
                    </span>
                </div>

                {/* Items */}
                <div className="flex items-center gap-1">
                    {build.items.map((item, idx) => (
                        <div
                            key={`${item.id}-${idx}`}
                            className="h-7 w-7 rounded bg-accent/40 overflow-hidden flex-shrink-0"
                        >
                            {item.iconUrl ? (
                                <img
                                    src={item.iconUrl}
                                    alt={`Item ${item.id}`}
                                    className="w-full h-full object-cover"
                                />
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
                    {/* Slots vazios para manter alinhamento */}
                    {Array.from({ length: Math.max(0, 7 - build.items.length) }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="h-7 w-7 rounded bg-accent/20 flex-shrink-0" />
                    ))}
                </div>

                {/* Spacer — empurra CS e Info pro final */}
                <div />

                {/* CS + Gold */}
                <div className="flex flex-col items-center">
                    <span className="text-textPrimary text-sm">{build.cs} CS</span>
                    <span className="text-xs text-textSecondary">{(build.goldEarned / 1000).toFixed(1)}k</span>
                </div>

                {/* Meta info */}
                <div className="flex flex-col items-end">
                    <span className="text-xs text-textSecondary">{formatDuration(build.gameDuration)}</span>
                    <span className="text-xs text-textSecondary/70">Patch {build.patch}</span>
                    {build.gameCreation && (
                        <span className="text-xs text-textSecondary/50">{timeAgo(build.gameCreation)}</span>
                    )}
                </div>
            </div>

            {/* Painel expandido — detalhes */}
            {isOpen && (
                <div className="bg-surface/80 border border-accent/30 border-t-0 rounded-b-md px-6 py-4 flex flex-wrap gap-8">
                    {/* Runas */}
                    {build.runes && (
                        <div className="flex flex-col gap-2">
                            <span className="text-xs text-textSecondary font-medium uppercase tracking-wider">
                                Runas
                            </span>

                            {/* Keystone */}
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-textSecondary/60 w-14">Keystone</span>
                                <RuneIcon runeId={build.runes.keystone} size={28} />
                            </div>

                            {/* Primary perks */}
                            {build.runes.primaryPerks && build.runes.primaryPerks.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-textSecondary/60 w-14">Primary</span>
                                    <div className="flex items-center gap-1">
                                        {build.runes.primaryPerks.map((perk, i) => (
                                            <RuneIcon key={`p-${i}`} runeId={perk} size={22} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Secondary perks */}
                            {build.runes.secondaryPerks && build.runes.secondaryPerks.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-textSecondary/60 w-14">Secondary</span>
                                    <div className="flex items-center gap-1">
                                        {build.runes.secondaryPerks.map((perk, i) => (
                                            <RuneIcon key={`s-${i}`} runeId={perk} size={22} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Stat shards */}
                            {build.runes.statShards && build.runes.statShards.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-textSecondary/60 w-14">Shards</span>
                                    <div className="flex items-center gap-1">
                                        {build.runes.statShards.map((shard, i) => (
                                            <RuneIcon key={`sh-${i}`} runeId={shard} size={20} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Summoner Spells */}
                    {build.summonerSpells && build.summonerSpells.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <span className="text-xs text-textSecondary font-medium uppercase tracking-wider">
                                Summoner Spells
                            </span>
                            <div className="flex items-center gap-2">
                                {build.summonerSpells.map((spellId, i) => (
                                    <SummonerSpellIcon key={`spell-${i}`} spellId={spellId} size={28} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stats detalhados */}
                    <div className="flex flex-col gap-2">
                        <span className="text-xs text-textSecondary font-medium uppercase tracking-wider">Stats</span>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-textSecondary text-xs">CS</span>
                                <span className="text-textPrimary">{build.cs}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-textSecondary text-xs">Gold</span>
                                <span className="text-textPrimary">{(build.goldEarned / 1000).toFixed(1)}k</span>
                            </div>
                            {build.visionScore !== undefined && build.visionScore > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-textSecondary text-xs">Vision</span>
                                    <span className="text-textPrimary">{build.visionScore}</span>
                                </div>
                            )}
                            {build.totalDamage !== undefined && build.totalDamage > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-textSecondary text-xs">Damage</span>
                                    <span className="text-textPrimary">{(build.totalDamage / 1000).toFixed(1)}k</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-textSecondary text-xs">Duração</span>
                                <span className="text-textPrimary">{formatDuration(build.gameDuration)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-textSecondary text-xs">Patch</span>
                                <span className="text-textPrimary">{build.patch}</span>
                            </div>
                        </div>
                    </div>

                    {/* Items expandidos com tamanho maior */}
                    <div className="flex flex-col gap-2">
                        <span className="text-xs text-textSecondary font-medium uppercase tracking-wider">Items</span>
                        <div className="flex items-center gap-1.5">
                            {build.items.map((item, idx) => (
                                <div
                                    key={`exp-${item.id}-${idx}`}
                                    className="h-10 w-10 rounded bg-accent/40 overflow-hidden"
                                >
                                    {item.iconUrl ? (
                                        <img
                                            src={item.iconUrl}
                                            alt={`Item ${item.id}`}
                                            className="w-full h-full object-cover"
                                        />
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
                    </div>
                </div>
            )}
        </div>
    );
}
