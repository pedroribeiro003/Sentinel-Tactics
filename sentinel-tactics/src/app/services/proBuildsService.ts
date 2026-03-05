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
    visionScore: number;
    totalDamage: number;
    items: Array<{
        id: number;
        iconUrl: string | null;
    }>;
    runes: {
        keystone: number;
        primaryStyle: number;
        secondaryStyle: number;
        primaryPerks: number[];
        secondaryPerks: number[];
        statShards: number[];
    } | null;
    summonerSpells: number[];
    patch: string;
    gameCreation: string;
    gameDuration: number;
}

interface FetchProBuildsParams {
    champion?: string;
    lane?: string;
    region?: string;
    limit?: number;
    page?: number;
}

interface FetchProBuildsResponse {
    builds: ProBuild[];
    total: number;
}

export async function fetchProBuilds(params?: FetchProBuildsParams): Promise<FetchProBuildsResponse> {
    const { data } = await api.get<FetchProBuildsResponse>("/pro-builds", {
        params,
    });
    return data;
}
