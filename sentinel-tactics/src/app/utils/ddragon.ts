// src/utils/ddragon.ts
// Patch atual — atualize aqui quando sair novo patch
const PATCH = "16.5.1";
const BASE = `https://ddragon.leagueoflegends.com/cdn/${PATCH}`;
const CDN_IMG = `https://ddragon.leagueoflegends.com/cdn/img`;

// =====================================================
// SUMMONER SPELLS
// =====================================================
const SUMMONER_SPELL_MAP: Record<number, string> = {
    1: "SummonerBoost",
    3: "SummonerExhaust",
    4: "SummonerFlash",
    6: "SummonerHaste",
    7: "SummonerHeal",
    11: "SummonerSmite",
    12: "SummonerTeleport",
    13: "SummonerMana",
    14: "SummonerDot",
    21: "SummonerBarrier",
    30: "SummonerPoroRecall",
    31: "SummonerPoroThrow",
    32: "SummonerSnowball",
    39: "SummonerSnowURFSnowball_Mark",
    54: "Summoner_UltBookPlaceholder",
    55: "Summoner_UltBookSmitePlaceholder",
};

export function getSummonerSpellIcon(spellId: number): string {
    const key = SUMMONER_SPELL_MAP[spellId];
    if (!key) return "";
    return `${BASE}/img/spell/${key}.png`;
}

// =====================================================
// RUNAS — patch 16.5.1 completo
// =====================================================
const RUNE_MAP: Record<number, string> = {
    // ── PRECISÃO (8000) ───────────────────────────────
    8000: "perk-images/Styles/7201_Precision.png",
    // Keystones
    8005: "perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png",
    8008: "perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png",
    8021: "perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png",
    8010: "perk-images/Styles/Precision/Conqueror/Conqueror.png",
    // Row 1
    9101: "perk-images/Styles/Precision/AbsorbLife.png",
    9111: "perk-images/Styles/Precision/Triumph.png",
    8009: "perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png",
    // Row 2
    9104: "perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png",
    9105: "perk-images/Styles/Precision/LegendHaste/LegendHaste.png",
    9103: "perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png",
    // Row 3
    8014: "perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png",
    8017: "perk-images/Styles/Precision/CutDown/CutDown.png",
    8299: "perk-images/Styles/Precision/LastStand/LastStand.png",

    // ── DOMINAÇÃO (8100) ──────────────────────────────
    8100: "perk-images/Styles/7200_Domination.png",
    // Keystones
    8112: "perk-images/Styles/Domination/Electrocute/Electrocute.png",
    8128: "perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png",
    9923: "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png",
    // Row 1
    8126: "perk-images/Styles/Domination/CheapShot/CheapShot.png",
    8139: "perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png",
    8143: "perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png",
    // Row 2
    8137: "perk-images/Styles/Domination/SixthSense/SixthSense.png",
    8140: "perk-images/Styles/Domination/GrislyMementos/GrislyMementos.png",
    8141: "perk-images/Styles/Domination/DeepWard/DeepWard.png",
    // Row 3
    8135: "perk-images/Styles/Domination/TreasureHunter/TreasureHunter.png",
    8105: "perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png",
    8106: "perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png",

    // ── FEITIÇARIA (8200) ─────────────────────────────
    8200: "perk-images/Styles/7202_Sorcery.png",
    // Keystones
    8214: "perk-images/Styles/Sorcery/SummonAery/SummonAery.png",
    8229: "perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png",
    8230: "perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png",
    // Row 1
    8224: "perk-images/Styles/Sorcery/NullifyingOrb/Pokeshield.png",
    8226: "perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png",
    8275: "perk-images/Styles/Sorcery/NimbusCloak/6361.png",
    // Row 2
    8210: "perk-images/Styles/Sorcery/Transcendence/Transcendence.png",
    8234: "perk-images/Styles/Sorcery/CelerityTemp/Celerity.png",
    8233: "perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png",
    // Row 3
    8237: "perk-images/Styles/Sorcery/Scorch/Scorch.png",
    8232: "perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png",
    8236: "perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png",

    // ── DETERMINAÇÃO / INSPIRAÇÃO (8300) ──────────────
    8300: "perk-images/Styles/7203_Whimsy.png",
    // Keystones
    8351: "perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png",
    8360: "perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png",
    8369: "perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png",
    // Row 1
    8306: "perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png",
    8304: "perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png",
    8321: "perk-images/Styles/Inspiration/CashBack/CashBack.png",
    8313: "perk-images/Styles/Inspiration/PerfectTiming/PerfectTiming.png",
    // Row 2
    8352: "perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png",
    8345: "perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png",
    // Row 3
    8347: "perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png",
    8410: "perk-images/Styles/Inspiration/ApproachVelocity/ApproachVelocity.png",
    8316: "perk-images/Styles/Inspiration/JackOfAllTrades/JackOfAllTrades.png",

    // ── RESOLVE (8400) ────────────────────────────────
    8400: "perk-images/Styles/7204_Resolve.png",
    // Keystones
    8437: "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png",
    8439: "perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png",
    8465: "perk-images/Styles/Resolve/Guardian/Guardian.png",
    // Row 1
    8446: "perk-images/Styles/Resolve/Demolish/Demolish.png",
    8463: "perk-images/Styles/Resolve/FontOfLife/FontOfLife.png",
    8401: "perk-images/Styles/Resolve/ShieldBash/ShieldBash.png",
    // Row 2
    8429: "perk-images/Styles/Resolve/Conditioning/Conditioning.png",
    8444: "perk-images/Styles/Resolve/SecondWind/SecondWind.png",
    8473: "perk-images/Styles/Resolve/BonePlating/BonePlating.png",
    // Row 3
    8451: "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png",
    8453: "perk-images/Styles/Resolve/Revitalize/Revitalize.png",
    8242: "perk-images/Styles/Resolve/Unflinching/Unflinching.png",

    // ── STAT SHARDS ───────────────────────────────────
    5001: "perk-images/StatMods/StatModsHealthScalingIcon.png",
    5002: "perk-images/StatMods/StatModsArmorIcon.png",
    5003: "perk-images/StatMods/StatModsMagicResIcon.MagicResist_Fix.png",
    5005: "perk-images/StatMods/StatModsAttackSpeedIcon.png",
    5007: "perk-images/StatMods/StatModsCDRScalingIcon.png",
    5008: "perk-images/StatMods/StatModsAdaptiveForceIcon.png",
    5010: "perk-images/StatMods/StatModsMovementSpeedIcon.png",
    5011: "perk-images/StatMods/StatModsHealthPlusIcon.png",
    5013: "perk-images/StatMods/StatModsTenacityIcon.png",
};

export function getRuneIcon(runeId: number): string {
    const path = RUNE_MAP[runeId];
    if (!path) return "";
    return `${CDN_IMG}/${path}`;
}

export function getRuneStyleIcon(styleId: number): string {
    return getRuneIcon(styleId);
}
