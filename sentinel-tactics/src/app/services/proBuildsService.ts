import { api } from "./api";

export interface ProBuild {
    id: number;
    playerName: string;
    team: string;
    region: string;
    champion: string;
    championIcon: string | null;
    lane: string;
    result: "Win" | "Loss";
    kills: number;
    deaths: number;
    assists: number;
    cs: number;
    goldEarned: number;
    items: Array<{
        id: number;
        iconUrl: string | null;
    }>;
    runes: {
        keystone: number;
        primaryStyle: number;
        secondaryStyle: number;
    } | null;
    summonerSpells: Array<{
        id: number;
        iconUrl: string | null;
    }>;
    patch: string;
    gameCreation: string;
    gameDuration: number;
}

export async function fetchProBuilds(params?: {
    champion?: string;
    lane?: string;
    region?: string;
    limit?: number;
    page?: number;
}): Promise<{ builds: ProBuild[]; total: number }> {
    const { data } = await api.get("/pro-builds", { params });
    return data;
}
