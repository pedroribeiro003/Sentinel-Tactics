import { api } from "./api";
import { ChampionDetails, Champion, Performance, Build, Runes, Matchups } from "../types/champions";

interface GetChampionDetailsParams {
    name: string;
    elo?: string;
    lane?: string;
    patch?: string;
}

export async function fetchChampionDetails({
    name,
    elo = "PLATINUM",
    lane,
    patch = "16.5",
}: GetChampionDetailsParams): Promise<ChampionDetails> {
    const safeName = encodeURIComponent(decodeURIComponent(name));
    const { data } = await api.get<ChampionDetails>(`/champions/${safeName}`, {
        params: { elo, patch, ...(lane ? { lane } : {}) },
    });
    return data;
}

export async function fetchChampionPerformance(
    name: string,
    elo = "PLATINUM",
    lane?: string,
    patch = "16.5"
): Promise<{ champion: Champion; performance: Performance }> {
    const details = await fetchChampionDetails({ name, elo, lane, patch });
    return {
        champion: details.champion,
        performance: details.performance,
    };
}

export async function fetchChampionBuilds(
    name: string,
    elo = "PLATINUM",
    lane?: string,
    patch = "16.5"
): Promise<Build[]> {
    const details = await fetchChampionDetails({ name, elo, lane, patch });
    return details.builds;
}

export async function fetchChampionRunes(
    name: string,
    elo = "PLATINUM",
    lane?: string,
    patch = "16.5"
): Promise<Runes[]> {
    const details = await fetchChampionDetails({ name, elo, lane, patch });
    return details.runes;
}

export async function fetchChampionMatchups(
    name: string,
    elo = "PLATINUM",
    lane?: string,
    patch = "16.5"
): Promise<Matchups> {
    const details = await fetchChampionDetails({ name, elo, lane, patch });
    return details.matchups;
}
