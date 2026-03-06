import { api } from "./api";

export interface TierListItem {
    id: string;
    name: string;
    image: string;
    tier: string;
    lane: string;
    winRate: number;
    pickRate: number;
    banRate: number;
    games: number;
}

export async function fetchTierList(
    limit = 20,
    elo = "PLATINUM",
    lane?: string,
    patch = "16.05"
): Promise<TierListItem[]> {
    const { data } = await api.get<TierListItem[]>("/tier-list", {
        params: { limit, elo, ...(lane ? { lane } : {}) },
    });
    return data;
}
