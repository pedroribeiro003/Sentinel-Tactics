"use client";

import { useState } from "react";
import { ProBuild } from "../services/proBuildsService";
import { getRuneIcon, getSummonerSpellIcon } from "../utils/ddragon";

interface ProBuildCardProps {
    build: ProBuild;
}

const DDRAGON = "https://ddragon.leagueoflegends.com/cdn/16.5.1/img";

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
    const url = getRuneIcon(runeId);
    return (
        <div
            className="rounded bg-accent/40 overflow-hidden flex-shrink-0 flex items-center justify-center"
            style={{ width: size, height: size }}
        >
            {url ? (
                <img src={url} alt={`Rune ${runeId}`} className="w-full h-full object-contain" />
            ) : (
                <span className="text-[8px] text-textSecondary">{runeId}</span>
            )}
        </div>
    );
}

function SummonerSpellIcon({ spellId, size = 24 }: { spellId: number; size?: number }) {
    const url = getSummonerSpellIcon(spellId);
    return (
        <div className="rounded bg-accent/40 overflow-hidden flex-shrink-0" style={{ width: size, height: size }}>
            {url ? (
                <img src={url} alt={`Spell ${spellId}`} className="w-full h-full object-cover" />
            ) : (
                <span className="text-[8px] text-textSecondary">{spellId}</span>
            )}
        </div>
    );
}

function ItemSlot({ item, size = 28 }: { item: { id: number; iconUrl?: string | null }; size?: number }) {
    return (
        <div className="rounded bg-accent/40 overflow-hidden flex-shrink-0" style={{ width: size, height: size }}>
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
    );
}

export default function ProBuildCard({ build }: ProBuildCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const isWin = build.result === "Win";

    return (
        <div>
            {/* ── MOBILE CARD ── */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`sm:hidden relative bg-surface border border-accent/30 rounded-md px-3 py-3 cursor-pointer select-none active:bg-accent/20 transition ${
                    isOpen ? "rounded-b-none border-b-0" : ""
                }`}
            >
                <div
                    className={`absolute left-0 top-0 h-full w-1 rounded-l-md ${
                        isWin ? "bg-highlight" : "bg-red-500/60"
                    }`}
                />

                <div className="pl-2 flex flex-col gap-2">
                    {/* Linha 1: champion + player + resultado */}
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded bg-accent/40 overflow-hidden flex-shrink-0">
                            <img
                                src={build.championIcon || `${DDRAGON}/champion/${build.champion}.png`}
                                alt={build.champion}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-textPrimary truncate">
                                    {build.champion}
                                </span>
                                <span
                                    className={`text-xs font-medium px-1.5 py-0.5 rounded flex-shrink-0 ${
                                        isWin ? "bg-highlight/30 text-highlight" : "bg-red-500/20 text-red-400"
                                    }`}
                                >
                                    {build.result}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-textSecondary">
                                <span className="truncate">{build.playerName}</span>
                                <span>•</span>
                                <span className="capitalize bg-accent/30 px-1.5 py-0.5 rounded flex-shrink-0">
                                    {build.lane}
                                </span>
                                <span>•</span>
                                <span className="flex-shrink-0">{build.region}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end flex-shrink-0">
                            <span className="text-sm font-medium text-textPrimary">
                                {build.kills}/{build.deaths}/{build.assists}
                            </span>
                            <span className="text-xs text-textSecondary">
                                {kdaRatio(build.kills, build.deaths, build.assists)} KDA
                            </span>
                        </div>
                    </div>

                    {/* Linha 2: items */}
                    <div className="flex items-center gap-1 flex-wrap">
                        {Array.isArray(build.items) &&
                            build.items.map((item, idx) => (
                                <ItemSlot key={`${item.id}-${idx}`} item={item} size={26} />
                            ))}
                    </div>

                    {/* Linha 3: stats */}
                    <div className="flex items-center justify-between text-xs text-textSecondary">
                        <span>
                            {build.cs} CS • {(build.goldEarned / 1000).toFixed(1)}k gold
                        </span>
                        <span>
                            {formatDuration(build.gameDuration)} • Patch {build.patch}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── DESKTOP ROW ── */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`hidden sm:grid relative grid-cols-[200px_100px_90px_220px_1fr_70px_100px] items-center gap-4 bg-surface border border-accent/30 rounded-md px-4 py-3 hover:bg-accent/20 transition cursor-pointer select-none ${
                    isOpen ? "rounded-b-none border-b-0" : ""
                }`}
            >
                <div
                    className={`absolute left-0 top-0 h-full w-1 rounded-l-md ${
                        isWin ? "bg-highlight" : "bg-red-500/60"
                    }`}
                />

                <div className="flex items-center gap-3 pl-2">
                    <div className="h-10 w-10 rounded bg-accent/40 overflow-hidden flex-shrink-0">
                        <img
                            src={build.championIcon || `${DDRAGON}/champion/${build.champion}.png`}
                            alt={build.champion}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                            }}
                        />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-textPrimary font-medium text-sm truncate">{build.champion}</span>
                        <span className="text-xs text-textSecondary truncate">{build.playerName}</span>
                        <span className="text-xs text-textSecondary/70 truncate">
                            {build.team} • {build.region}
                        </span>
                    </div>
                </div>

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

                <div className="flex flex-col items-center">
                    <span className="text-textPrimary text-sm font-medium">
                        {build.kills}/{build.deaths}/{build.assists}
                    </span>
                    <span className="text-xs text-textSecondary">
                        {kdaRatio(build.kills, build.deaths, build.assists)} KDA
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    {Array.isArray(build.items) &&
                        build.items.map((item, idx) => <ItemSlot key={`${item.id}-${idx}`} item={item} size={28} />)}
                    {Array.from({ length: Math.max(0, 7 - (build.items?.length ?? 0)) }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="h-7 w-7 rounded bg-accent/20 flex-shrink-0" />
                    ))}
                </div>

                <div />

                <div className="flex flex-col items-center">
                    <span className="text-textPrimary text-sm">{build.cs} CS</span>
                    <span className="text-xs text-textSecondary">{(build.goldEarned / 1000).toFixed(1)}k</span>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-xs text-textSecondary">{formatDuration(build.gameDuration)}</span>
                    <span className="text-xs text-textSecondary/70">Patch {build.patch}</span>
                    {build.gameCreation && (
                        <span className="text-xs text-textSecondary/50">{timeAgo(build.gameCreation)}</span>
                    )}
                </div>
            </div>

            {/* ── PAINEL EXPANDIDO ── */}
            {isOpen && (
                <div className="bg-surface/80 border border-accent/30 border-t-0 rounded-b-md px-4 sm:px-6 py-4 flex flex-wrap gap-6 sm:gap-8">
                    {build.runes && (
                        <div className="flex flex-col gap-2">
                            <span className="text-xs text-textSecondary font-medium uppercase tracking-wider">
                                Runas
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-textSecondary/60 w-14">Keystone</span>
                                <RuneIcon runeId={build.runes.keystone} size={28} />
                            </div>
                            {Array.isArray(build.runes.primaryPerks) && build.runes.primaryPerks.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-textSecondary/60 w-14">Primary</span>
                                    <div className="flex gap-1">
                                        {build.runes.primaryPerks.map((perk, i) => (
                                            <RuneIcon key={i} runeId={perk} size={22} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {Array.isArray(build.runes.secondaryPerks) && build.runes.secondaryPerks.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-textSecondary/60 w-14">Secondary</span>
                                    <div className="flex gap-1">
                                        {build.runes.secondaryPerks.map((perk, i) => (
                                            <RuneIcon key={i} runeId={perk} size={22} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {Array.isArray(build.runes.statShards) && build.runes.statShards.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-textSecondary/60 w-14">Shards</span>
                                    <div className="flex gap-1">
                                        {build.runes.statShards.map((shard, i) => (
                                            <RuneIcon key={i} runeId={shard} size={20} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {Array.isArray(build.summonerSpells) && build.summonerSpells.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <span className="text-xs text-textSecondary font-medium uppercase tracking-wider">
                                Summoner Spells
                            </span>
                            <div className="flex gap-2">
                                {build.summonerSpells.map((spellId, i) => (
                                    <SummonerSpellIcon key={i} spellId={spellId} size={28} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <span className="text-xs text-textSecondary font-medium uppercase tracking-wider">Stats</span>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                            <div className="flex gap-2">
                                <span className="text-textSecondary text-xs">CS</span>
                                <span className="text-textPrimary">{build.cs}</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-textSecondary text-xs">Gold</span>
                                <span className="text-textPrimary">{(build.goldEarned / 1000).toFixed(1)}k</span>
                            </div>
                            {build.visionScore !== undefined && build.visionScore > 0 && (
                                <div className="flex gap-2">
                                    <span className="text-textSecondary text-xs">Vision</span>
                                    <span className="text-textPrimary">{build.visionScore}</span>
                                </div>
                            )}
                            {build.totalDamage !== undefined && build.totalDamage > 0 && (
                                <div className="flex gap-2">
                                    <span className="text-textSecondary text-xs">Damage</span>
                                    <span className="text-textPrimary">{(build.totalDamage / 1000).toFixed(1)}k</span>
                                </div>
                            )}
                            <div className="flex gap-2">
                                <span className="text-textSecondary text-xs">Duração</span>
                                <span className="text-textPrimary">{formatDuration(build.gameDuration)}</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-textSecondary text-xs">Patch</span>
                                <span className="text-textPrimary">{build.patch}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-xs text-textSecondary font-medium uppercase tracking-wider">Items</span>
                        <div className="flex flex-wrap gap-1.5">
                            {Array.isArray(build.items) &&
                                build.items.map((item, idx) => (
                                    <ItemSlot key={`exp-${item.id}-${idx}`} item={item} size={40} />
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
