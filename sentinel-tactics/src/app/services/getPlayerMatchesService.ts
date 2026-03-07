import { api } from "./api";

export type Match = {
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
    gameCreation?: number;
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
    damageDealt?: { total: number; physical: number; magic: number; trueDamage: number };
    damageTaken?: { total: number; physical: number; magic: number; trueDamage: number };
    vision?: { score: number; wardsPlaced: number; wardsKilled: number; controlWardsBought: number };
    items?: Array<{ id: number; iconUrl: string | null }>;
    summonerSpells?: Array<{ id: number; name: string; iconUrl: string }>;
    runes?: {
        primary: { id: number; name: string; iconUrl: string };
        secondary: { id: number; name: string; iconUrl: string };
    } | null;
    multikills?: { double: number; triple: number; quadra: number; penta: number } | null;
    structures?: { turrets: number; inhibitors: number; baronKills: number; dragonKills: number } | null;
    badges?: string[];
    participants?: Array<{
        puuid: string;
        summonerName: string;
        tagLine: string;
        championId: number;
        championName: string;
        championIconUrl: string | null;
        teamId: number;
        kills: number;
        deaths: number;
        assists: number;
        win: boolean;
        role: string;
        items?: Array<{ id: number; iconUrl: string | null }>;
    }>;
    source?: "api" | "database";
};

interface GetMatchesParams {
    puuid: string;
    regiao: string;
    limite?: number;
}

class GetPlayerMatchesService {
    async getMatches({ puuid, regiao, limite = 20 }: GetMatchesParams): Promise<Match[]> {
        const { data } = await api.get("/match-history", {
            params: { puuid, regiao, limite },
        });
        return data.matches || [];
    }
}

export const getPlayerMatchesService = new GetPlayerMatchesService();