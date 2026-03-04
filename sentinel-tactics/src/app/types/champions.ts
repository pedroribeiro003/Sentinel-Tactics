// src/types/champion.ts
export interface Champion {
    name: string;
    title: string;
    icon_url: string | null;
    splash_url: string | null;
    loading_url: string | null;
}

export interface Performance {
    winrate: number | null;
    pickrate: number | null;
    banrate: number | null;
    games: number;
    tier: string | null;
    lane: string;
}

export interface Build {
    items: number[];
    winrate: number;
    games: number;
    pickrate: number;
}

export interface Runes {
    primary: {
        style: number;
        keystone: number;
        perks: number[];
    };
    secondary: {
        style: number;
        perks: number[];
    };
    statShards: number[];
    winrate: number;
    games: number;
    pickrate: number;
}

export interface Matchup {
    champion: string;
    winrate: number;
    games: number;
}

export interface Matchups {
    favorable: Matchup[];
    difficult: Matchup[];
}

export interface Item {
    itemId: number;
    itemName: string | null;
    winrate: number;
    games: number;
    pickrate: number;
    avgPosition: number;
}

export interface SummonerSpell {
    spell1: number;
    spell2: number;
    winrate: number;
    games: number;
    pickrate: number;
}

export interface ChampionDetails {
    champion: Champion;
    performance: Performance;
    builds: Build[];
    runes: Runes[];
    matchups: Matchups;
    items: Item[];
    summonerSpells: SummonerSpell[];
    metadata: {
        elo: string;
        lane: string;
        lastUpdate: string;
    };
}
