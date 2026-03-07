import { api } from "./api";

interface GetPuuidParams {
    nome: string;
    tag: string;
    regiao: string;
}

interface QueueInfo {
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    winRate: number;
}

export interface PlayerInfo {
    puuid: string;
    summonerLevel: number;
    profileIconId: number;
    soloQueue: QueueInfo | null;
    flexQueue: QueueInfo | null;
}

export const findPlayerService = {
    async getPlayerInfo({ nome, tag, regiao }: GetPuuidParams): Promise<PlayerInfo> {
        const { data } = await api.get<PlayerInfo>("/find-player", {
            params: { nome, tag, regiao },
        });
        return data;
    },
};