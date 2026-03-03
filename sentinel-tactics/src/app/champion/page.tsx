"use client";
import { useState } from "react";
import { Button } from "../components/Button";

// DADOS MOCKADOS
const MOCK_CHAMPION = {
    name: "Yasuo",
    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Yasuo.png",
    tier: "S",
    winRate: 51.2,
    pickRate: 12.5,
    banRate: 8.3,
    games: 125000,
    stats: {
        hp: 490,
        hpregen: 6.5,
        mp: 100,
        mpregen: 0,
        attackdamage: 60,
        attackspeed: 0.697,
        armor: 30,
        spellblock: 32,
        movespeed: 345,
        attackrange: 175,
    },
    runes: {
        primary: {
            tree: "Precision",
            keystone: {
                id: 8010,
                name: "Conqueror",
                iconUrl:
                    "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png",
            },
            runes: [
                {
                    id: 9111,
                    name: "Triumph",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Triumph.png",
                },
                {
                    id: 9104,
                    name: "Legend: Alacrity",
                    iconUrl:
                        "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png",
                },
                {
                    id: 8299,
                    name: "Last Stand",
                    iconUrl:
                        "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/LastStand/LastStand.png",
                },
            ],
        },
        secondary: {
            tree: "Resolve",
            runes: [
                {
                    id: 8473,
                    name: "Bone Plating",
                    iconUrl:
                        "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/BonePlating/BonePlating.png",
                },
                {
                    id: 8451,
                    name: "Overgrowth",
                    iconUrl:
                        "https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/Overgrowth/Overgrowth.png",
                },
            ],
        },
        shards: [
            { name: "Attack Speed", value: "+10% Attack Speed" },
            { name: "Adaptive Force", value: "+9 Adaptive Force" },
            { name: "Health", value: "+65 Health" },
        ],
        pickrate: 73.4,
        winrate: 52.1,
    },
    topBuilds: [
        {
            name: "Crit Build (Principal)",
            winrate: 54.5,
            pickrate: 68.2,
            games: 85250,
            items: [
                {
                    id: 6673,
                    name: "Immortal Shieldbow",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/6673.png",
                },
                {
                    id: 3006,
                    name: "Berserker's Greaves",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3006.png",
                },
                {
                    id: 3031,
                    name: "Infinity Edge",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3031.png",
                },
                {
                    id: 3072,
                    name: "Bloodthirster",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3072.png",
                },
                {
                    id: 3026,
                    name: "Guardian Angel",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3026.png",
                },
                {
                    id: 3033,
                    name: "Mortal Reminder",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3033.png",
                },
            ],
        },
        {
            name: "Sustain Build",
            winrate: 52.1,
            pickrate: 21.5,
            games: 26875,
            items: [
                {
                    id: 6673,
                    name: "Immortal Shieldbow",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/6673.png",
                },
                {
                    id: 3006,
                    name: "Berserker's Greaves",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3006.png",
                },
                {
                    id: 3072,
                    name: "Bloodthirster",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3072.png",
                },
                {
                    id: 3153,
                    name: "Blade of the Ruined King",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3153.png",
                },
                {
                    id: 3026,
                    name: "Guardian Angel",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3026.png",
                },
                {
                    id: 3181,
                    name: "Hullbreaker",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3181.png",
                },
            ],
        },
        {
            name: "Lethality Build",
            winrate: 49.8,
            pickrate: 10.3,
            games: 12875,
            items: [
                {
                    id: 6692,
                    name: "Eclipse",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/6692.png",
                },
                {
                    id: 3158,
                    name: "Ionian Boots",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3158.png",
                },
                {
                    id: 3142,
                    name: "Youmuu's Ghostblade",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3142.png",
                },
                {
                    id: 6676,
                    name: "The Collector",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/6676.png",
                },
                {
                    id: 3814,
                    name: "Edge of Night",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3814.png",
                },
                {
                    id: 3026,
                    name: "Guardian Angel",
                    iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3026.png",
                },
            ],
        },
    ],
    topItems: [
        {
            id: 3031,
            name: "Infinity Edge",
            iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3031.png",
            winrate: 54.2,
            pickrate: 78.5,
            games: 98000,
        },
        {
            id: 3072,
            name: "Bloodthirster",
            iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/3072.png",
            winrate: 53.1,
            pickrate: 45.2,
            games: 56500,
        },
        {
            id: 6673,
            name: "Immortal Shieldbow",
            iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/6673.png",
            winrate: 52.8,
            pickrate: 82.1,
            games: 102600,
        },
    ],
    skills: [
        {
            key: "Q",
            name: "Steel Tempest",
            iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/YasuoQW.png",
        },
        {
            key: "W",
            name: "Wind Wall",
            iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/YasuoWMovingWall.png",
        },
        {
            key: "E",
            name: "Sweeping Blade",
            iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/YasuoDashWrapper.png",
        },
        {
            key: "R",
            name: "Last Breath",
            iconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/YasuoRKnockUpComboW.png",
        },
    ],
    skillOrder: {
        order: [0, 2, 0, 1, 0, 3, 0, 2, 0, 2, 3, 2, 2, 1, 1, 3, 1, 1], // Q=0, W=1, E=2, R=3
        priority: "Q > E > W",
        pickrate: 87.3,
    },
};

const LANES = [
    { value: "ALL", label: "Todas as Lanes", icon: "🎯" },
    { value: "TOP", label: "Top", icon: "⬆️" },
    { value: "JUNGLE", label: "Jungle", icon: "🌲" },
    { value: "MIDDLE", label: "Mid", icon: "⭐" },
    { value: "BOTTOM", label: "ADC", icon: "⬇️" },
    { value: "UTILITY", label: "Support", icon: "🛡️" },
];

export default function ChampionPage() {
    const [championName, setChampionName] = useState("");
    const [elo, setElo] = useState("PLATINUM_PLUS");
    const [lane, setLane] = useState("ALL");
    const [searched, setSearched] = useState(false);

    const handleSearch = () => {
        if (!championName) {
            alert("Digite o nome de um campeão!");
            return;
        }
        setSearched(true);
    };

    if (!searched) {
        return (
            <main className="p-4">
                <section className="flex flex-col gap-4 bg-surface p-8 max-w-md mx-auto">
                    <h1 className="text-2xl mb-4">Buscar Campeão</h1>

                    <input
                        type="text"
                        placeholder="Nome do campeão (ex: Yasuo)"
                        value={championName}
                        onChange={(e) => setChampionName(e.target.value)}
                        className="px-4 py-2 bg-background text-text rounded"
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-textSecondary">Elo:</label>
                        <select
                            value={elo}
                            onChange={(e) => setElo(e.target.value)}
                            className="px-4 py-2 bg-background text-text rounded"
                        >
                            <option value="IRON">Iron</option>
                            <option value="BRONZE">Bronze</option>
                            <option value="SILVER">Silver</option>
                            <option value="GOLD">Gold</option>
                            <option value="PLATINUM">Platinum</option>
                            <option value="PLATINUM_PLUS">Platinum+</option>
                            <option value="EMERALD_PLUS">Emerald+</option>
                            <option value="DIAMOND_PLUS">Diamond+</option>
                            <option value="MASTER_PLUS">Master+</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-textSecondary">Lane:</label>
                        <select
                            value={lane}
                            onChange={(e) => setLane(e.target.value)}
                            className="px-4 py-2 bg-background text-text rounded"
                        >
                            {LANES.map((l) => (
                                <option key={l.value} value={l.value}>
                                    {l.icon} {l.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button variant="primary" onClick={handleSearch}>
                        Buscar
                    </Button>
                </section>
            </main>
        );
    }

    const currentLane = LANES.find((l) => l.value === lane);

    return (
        <main className="p-4 flex flex-col gap-8">
            {/* HEADER DO CAMPEÃO */}
            <section className="flex flex-row gap-4 bg-surface p-4 items-center">
                <div className="w-32 h-32">
                    <img
                        src={MOCK_CHAMPION.iconUrl}
                        alt={MOCK_CHAMPION.name}
                        className="rounded-full w-full h-full object-cover border-4 border-accent"
                    />
                </div>

                <div className="flex flex-col flex-1">
                    <h1 className="text-3xl font-bold">{MOCK_CHAMPION.name}</h1>
                    <span className="text-textSecondary">
                        {elo} • {currentLane?.icon} {currentLane?.label}
                    </span>

                    <div className="py-2 flex gap-2">
                        <Button variant="primary" onClick={() => {}}>
                            Atualizar
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setSearched(false);
                                setChampionName("");
                            }}
                        >
                            Nova Busca
                        </Button>
                    </div>
                </div>

                {/* SELETOR DE LANE RÁPIDO */}
                <div className="flex flex-col gap-2">
                    <span className="text-xs text-textSecondary text-center">Trocar Lane:</span>
                    <div className="flex gap-2">
                        {LANES.slice(1).map((l) => (
                            <button
                                key={l.value}
                                onClick={() => setLane(l.value)}
                                className={`w-10 h-10 rounded flex items-center justify-center text-xl transition ${
                                    lane === l.value ? "bg-highlight text-background" : "bg-background hover:bg-accent"
                                }`}
                                title={l.label}
                            >
                                {l.icon}
                            </button>
                        ))}
                    </div>
                </div>

                {/* TIER */}
                <div className="flex flex-col items-center bg-background p-4 rounded">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">{MOCK_CHAMPION.tier}</span>
                    </div>
                    <span className="text-sm font-medium mt-2 text-textSecondary">Tier {MOCK_CHAMPION.tier}</span>
                </div>
            </section>

            {/* ESTATÍSTICAS GERAIS */}
            <section className="grid grid-cols-4 gap-4">
                <StatCard
                    label="Win Rate"
                    value={`${MOCK_CHAMPION.winRate}%`}
                    highlight={MOCK_CHAMPION.winRate >= 50}
                />
                <StatCard label="Pick Rate" value={`${MOCK_CHAMPION.pickRate}%`} />
                <StatCard label="Ban Rate" value={`${MOCK_CHAMPION.banRate}%`} />
                <StatCard label="Partidas" value={MOCK_CHAMPION.games.toLocaleString()} />
            </section>

            {/* ESTATÍSTICAS DO CAMPEÃO */}
            <section className="bg-surface p-6 rounded">
                <h2 className="text-xl font-bold mb-4">⚔️ Atributos Base (Lvl 1)</h2>
                <div className="grid grid-cols-3 gap-6">
                    <StatDetail label="❤️ HP" value={MOCK_CHAMPION.stats.hp.toString()} />
                    <StatDetail label="💚 HP Regen" value={MOCK_CHAMPION.stats.hpregen.toString()} />
                    <StatDetail label="💙 Mana" value={MOCK_CHAMPION.stats.mp.toString()} />
                    <StatDetail label="💧 Mana Regen" value={MOCK_CHAMPION.stats.mpregen.toString()} />
                    <StatDetail label="⚔️ Attack Damage" value={MOCK_CHAMPION.stats.attackdamage.toString()} />
                    <StatDetail label="⚡ Attack Speed" value={MOCK_CHAMPION.stats.attackspeed.toFixed(3)} />
                    <StatDetail label="🛡️ Armor" value={MOCK_CHAMPION.stats.armor.toString()} />
                    <StatDetail label="✨ Magic Resist" value={MOCK_CHAMPION.stats.spellblock.toString()} />
                    <StatDetail label="👟 Move Speed" value={MOCK_CHAMPION.stats.movespeed.toString()} />
                </div>
            </section>

            {/* RUNAS */}
            <section className="bg-surface p-6 rounded">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">🔮 Runas Recomendadas</h2>
                    <div className="text-sm text-textSecondary">
                        WR: <span className="text-highlight font-medium">{MOCK_CHAMPION.runes.winrate}%</span> • PR:{" "}
                        <span className="font-medium">{MOCK_CHAMPION.runes.pickrate}%</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* PRIMARY TREE */}
                    <div className="bg-background p-4 rounded border-2 border-accent">
                        <h3 className="font-bold text-center mb-4 text-lg">{MOCK_CHAMPION.runes.primary.tree}</h3>

                        {/* Keystone */}
                        <div className="flex justify-center mb-4">
                            <div className="relative group">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 p-1">
                                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                                        <img
                                            src={MOCK_CHAMPION.runes.primary.keystone.iconUrl}
                                            alt={MOCK_CHAMPION.runes.primary.keystone.name}
                                            className="w-14 h-14"
                                        />
                                    </div>
                                </div>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-background border border-accent rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                                    {MOCK_CHAMPION.runes.primary.keystone.name}
                                </div>
                            </div>
                        </div>

                        {/* Primary Runes */}
                        <div className="flex flex-col gap-3">
                            {MOCK_CHAMPION.runes.primary.runes.map((rune, index) => (
                                <div key={index} className="flex items-center gap-3 group">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-accent p-1">
                                            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                                                <img src={rune.iconUrl} alt={rune.name} className="w-8 h-8" />
                                            </div>
                                        </div>
                                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-background border border-accent rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                                            {rune.name}
                                        </div>
                                    </div>
                                    <span className="text-sm">{rune.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECONDARY TREE */}
                    <div className="bg-background p-4 rounded border-2 border-accent/50">
                        <h3 className="font-bold text-center mb-4 text-lg">{MOCK_CHAMPION.runes.secondary.tree}</h3>

                        {/* Secondary Runes */}
                        <div className="flex flex-col gap-3 mt-12">
                            {MOCK_CHAMPION.runes.secondary.runes.map((rune, index) => (
                                <div key={index} className="flex items-center gap-3 group">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-accent/50 p-1">
                                            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                                                <img src={rune.iconUrl} alt={rune.name} className="w-8 h-8" />
                                            </div>
                                        </div>
                                        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-background border border-accent rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                                            {rune.name}
                                        </div>
                                    </div>
                                    <span className="text-sm">{rune.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* STAT SHARDS */}
                <div className="mt-6 bg-background p-4 rounded">
                    <h4 className="font-bold mb-3 text-center">Fragmentos de Estatística</h4>
                    <div className="flex justify-center gap-6">
                        {MOCK_CHAMPION.runes.shards.map((shard, index) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 rounded bg-accent flex items-center justify-center text-lg">
                                    {index === 0 ? "⚡" : index === 1 ? "⚔️" : "❤️"}
                                </div>
                                <span className="text-xs text-center text-textSecondary">{shard.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MELHORES BUILDS */}
            <section className="bg-surface p-6 rounded">
                <h2 className="text-xl font-bold mb-4">🏆 Melhores Builds Completas</h2>
                <div className="space-y-4">
                    {MOCK_CHAMPION.topBuilds.map((build, index) => (
                        <div
                            key={index}
                            className="bg-background p-4 rounded border-2 border-accent/30 hover:border-highlight/50 transition"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h3 className="font-bold text-lg">{build.name}</h3>
                                    <div className="flex gap-4 mt-1 text-sm">
                                        <span className="text-textSecondary">
                                            ✅ WR: <span className="text-highlight font-medium">{build.winrate}%</span>
                                        </span>
                                        <span className="text-textSecondary">
                                            📊 PR: <span className="font-medium">{build.pickrate}%</span>
                                        </span>
                                        <span className="text-textSecondary">{build.games.toLocaleString()} jogos</span>
                                    </div>
                                </div>
                                {index === 0 && (
                                    <span className="bg-highlight text-background px-3 py-1 rounded-full text-xs font-bold">
                                        RECOMENDADO
                                    </span>
                                )}
                            </div>

                            <div className="flex gap-2 items-center">
                                {build.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="relative group">
                                        <div className="w-14 h-14 bg-accent rounded border-2 border-accent overflow-hidden hover:border-highlight transition">
                                            <img
                                                src={item.iconUrl}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-accent rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                                            {item.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* MELHORES ITEMS INDIVIDUAIS */}
            <section className="bg-surface p-6 rounded">
                <h2 className="text-xl font-bold mb-4">📦 Melhores Items Individuais</h2>
                <div className="space-y-3">
                    {MOCK_CHAMPION.topItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 bg-background p-4 rounded hover:bg-accent/20 transition"
                        >
                            <div className="w-16 h-16 bg-accent rounded overflow-hidden flex-shrink-0 border-2 border-accent">
                                <img src={item.iconUrl} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-lg">{item.name}</p>
                                <div className="flex gap-4 mt-1">
                                    <span className="text-sm text-textSecondary">
                                        ✅ Win Rate: <span className="text-highlight font-medium">{item.winrate}%</span>
                                    </span>
                                    <span className="text-sm text-textSecondary">
                                        📊 Pick Rate: <span className="font-medium">{item.pickrate}%</span>
                                    </span>
                                </div>
                            </div>
                            <span className="text-sm text-textSecondary font-medium">
                                {item.games.toLocaleString()} jogos
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* SKILLS */}
            <section className="bg-surface p-6 rounded">
                <h2 className="text-xl font-bold mb-4">⚡ Habilidades</h2>
                <div className="grid grid-cols-4 gap-4">
                    {MOCK_CHAMPION.skills.map((skill, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 bg-background p-4 rounded">
                            <div className="w-16 h-16 bg-accent rounded overflow-hidden border-2 border-accent">
                                <img src={skill.iconUrl} alt={skill.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl font-bold">{skill.key}</span>
                            <span className="text-xs text-textSecondary text-center">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* SKILL ORDER */}
            <section className="bg-surface p-6 rounded">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">📊 Ordem de Up das Habilidades</h2>
                    <span className="text-sm text-textSecondary">
                        Pick Rate:{" "}
                        <span className="text-highlight font-medium">{MOCK_CHAMPION.skillOrder.pickrate}%</span>
                    </span>
                </div>

                {/* Prioridade */}
                <div className="bg-background p-4 rounded mb-4">
                    <p className="text-sm text-textSecondary mb-2">Prioridade de Max:</p>
                    <p className="text-2xl font-bold text-highlight">{MOCK_CHAMPION.skillOrder.priority}</p>
                </div>

                {/* Grid Compacto 18 Níveis */}
                <div className="bg-background p-6 rounded">
                    <div className="grid grid-cols-18 gap-1">
                        {MOCK_CHAMPION.skillOrder.order.map((skillIndex, level) => {
                            const skill = ["Q", "W", "E", "R"][skillIndex];
                            const isUlt = skillIndex === 3;

                            return (
                                <div key={level} className="flex flex-col items-center">
                                    <span className="text-[10px] text-textSecondary mb-1">{level + 1}</span>
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                            isUlt
                                                ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
                                                : skillIndex === 0
                                                ? "bg-blue-500 text-white"
                                                : skillIndex === 1
                                                ? "bg-green-500 text-white"
                                                : "bg-purple-500 text-white"
                                        }`}
                                    >
                                        {skill}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="flex gap-4 mt-4 justify-center flex-wrap text-xs">
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                            <span>Q</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            <span>W</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                            <span>E</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
                            <span>R (Ultimate)</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function StatCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className={`bg-surface p-6 rounded ${highlight ? "border-2 border-highlight" : ""}`}>
            <p className="text-sm text-textSecondary mb-2">{label}</p>
            <p className={`text-3xl font-bold ${highlight ? "text-highlight" : "text-textPrimary"}`}>{value}</p>
        </div>
    );
}

function StatDetail({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-background p-3 rounded">
            <p className="text-xs text-textSecondary mb-1">{label}</p>
            <p className="text-xl font-bold text-textPrimary">{value}</p>
        </div>
    );
}
