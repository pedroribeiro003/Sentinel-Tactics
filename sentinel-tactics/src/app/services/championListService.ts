// sentinel-tactics/src/app/services/championService.ts
import { api } from "./api";
import { ChampionDetails, Champion, Performance, Build, Runes, Matchups } from "../types/champions";

interface GetChampionDetailsParams {
    name: string;
    elo?: string;
    lane?: string;
}

export interface ChampionListItem {
    id: string;
    name: string;
    image: string | null;
}

// ✅ NOVA FUNÇÃO: Buscar lista completa de champions
export async function fetchChampionList(): Promise<ChampionListItem[]> {
    const { data } = await api.get<ChampionListItem[]>("/champions");
    return data;
}

// Funções existentes
export async function fetchChampionDetails({
    name,
    elo = "PLATINUM",
    lane,
}: GetChampionDetailsParams): Promise<ChampionDetails> {
    const { data } = await api.get<ChampionDetails>(`/champions/${encodeURIComponent(name)}`, {
        params: { elo, ...(lane ? { lane } : {}) },
    });
    return data;
}

export async function fetchChampionPerformance(
    name: string,
    elo = "PLATINUM",
    lane?: string
): Promise<{ champion: Champion; performance: Performance }> {
    const details = await fetchChampionDetails({ name, elo, lane });
    return {
        champion: details.champion,
        performance: details.performance,
    };
}

export async function fetchChampionBuilds(name: string, elo = "PLATINUM", lane?: string): Promise<Build[]> {
    const details = await fetchChampionDetails({ name, elo, lane });
    return details.builds;
}

export async function fetchChampionRunes(name: string, elo = "PLATINUM", lane?: string): Promise<Runes[]> {
    const details = await fetchChampionDetails({ name, elo, lane });
    return details.runes;
}

export async function fetchChampionMatchups(name: string, elo = "PLATINUM", lane?: string): Promise<Matchups> {
    const details = await fetchChampionDetails({ name, elo, lane });
    return details.matchups;
}
