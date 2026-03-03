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

interface ErrorResponse {
    erro: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const findPlayerService = {
    async getPlayerInfo({ nome, tag, regiao }: GetPuuidParams): Promise<PlayerInfo> {
        try {
            const params = new URLSearchParams({
                nome,
                tag,
                regiao,
            });

            const url = `${API_BASE_URL}/find-player?${params}`;
            console.log("🔍 [findPlayer] Chamando URL:", url);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("📡 [findPlayer] Status:", response.status);

            const responseText = await response.text();
            console.log("📡 [findPlayer] Resposta:", responseText);

            if (!response.ok) {
                try {
                    const errorData: ErrorResponse = JSON.parse(responseText);
                    throw new Error(errorData.erro || "Erro ao buscar jogador");
                } catch {
                    throw new Error(`Erro ${response.status}: ${responseText.substring(0, 100)}`);
                }
            }

            const data: PlayerInfo = JSON.parse(responseText);
            return data;
        } catch (error) {
            console.error("❌ [findPlayer] Erro:", error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Erro desconhecido ao buscar jogador");
        }
    },
};
