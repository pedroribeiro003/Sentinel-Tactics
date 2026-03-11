// src/app/services/championListService.ts
import { api } from "./api";

export interface ChampionListItem {
    id: number;
    name: string;
    image: string | null;
}

export async function fetchChampionList(): Promise<ChampionListItem[]> {
    const { data } = await api.get<ChampionListItem[]>("/champions");
    return data;
}
