// src/types/champions.ts
export interface Champion {
    name: string;
    title: string | null;
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

export interface BuildItem {
    itemId: number;
    icon_url: string | null;
}

export interface Build {
    items: BuildItem[];
    trinket: { itemId: number; icon_url: string | null } | null;
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
    icon_url: string | null;
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

export interface SkillOrder {
    skillOrder: string; // ex: "QQWEQRQEQERWEERWR"
    maxOrder: string; // ex: "Q > E > W"
    winrate: number;
    games: number;
    pickrate: number;
}

export interface JunglePath {
    path: string[]; // ex: ["blue_top", "gromp_top", ...]
    winrate: number;
    games: number;
}

export interface ChampionDetails {
    champion: Champion;
    performance: Performance;
    builds: Build[];
    runes: Runes[];
    matchups: Matchups;
    items: Item[];
    summonerSpells: SummonerSpell[];
    skillOrder: SkillOrder | null;
    junglePath: JunglePath | null;
    metadata: {
        elo: string;
        lane: string;
        patch: string;
        lastUpdate: string;
    };
}
