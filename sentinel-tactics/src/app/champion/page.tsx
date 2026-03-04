// app/champion/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/Button";

const LANES = [
    { value: "ALL", label: "Todas as Lanes", icon: "🎯" },
    { value: "TOP", label: "Top", icon: "⬆️" },
    { value: "JUNGLE", label: "Jungle", icon: "🌲" },
    { value: "MIDDLE", label: "Mid", icon: "⭐" },
    { value: "BOTTOM", label: "ADC", icon: "⬇️" },
    { value: "UTILITY", label: "Support", icon: "🛡️" },
];

export default function ChampionSearchPage() {
    const router = useRouter();
    const [championName, setChampionName] = useState("");
    const [elo, setElo] = useState("PLATINUM");
    const [lane, setLane] = useState("ALL");

    const handleSearch = () => {
        if (!championName.trim()) {
            alert("Digite o nome de um campeão!");
            return;
        }

        // Normalizar nome (remover espaços extras)
        const normalizedName = championName.trim().toUpperCase().replace(/\s+/g, "%20");

        // Montar query string
        const queryParams = new URLSearchParams();
        queryParams.append("elo", elo);
        if (lane !== "ALL") {
            queryParams.append("lane", lane);
        }

        // Redirecionar para a página do champion
        router.push(`/champion/${normalizedName}?${queryParams.toString()}`);
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <section className="flex flex-col gap-6 bg-surface p-8 rounded-lg shadow-2xl max-w-md w-full">
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold mb-2">🔍 Buscar Campeão</h1>
                    <p className="text-textSecondary text-sm">
                        Digite o nome do campeão para ver estatísticas completas
                    </p>
                </div>

                {/* INPUT CHAMPION NAME */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-textSecondary font-medium">Nome do Campeão:</label>
                    <input
                        type="text"
                        placeholder="Ex: Yasuo, Miss Fortune, Lee Sin..."
                        value={championName}
                        onChange={(e) => setChampionName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="px-4 py-3 bg-background text-text rounded-lg border-2 border-accent/30 focus:border-highlight focus:outline-none transition"
                        autoFocus
                    />
                </div>

                {/* ELO SELECTOR */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-textSecondary font-medium">Elo:</label>
                    <select
                        value={elo}
                        onChange={(e) => setElo(e.target.value)}
                        className="px-4 py-3 bg-background text-text rounded-lg border-2 border-accent/30 focus:border-highlight focus:outline-none transition cursor-pointer"
                    >
                        <option value="IRON">🟤 Iron</option>
                        <option value="BRONZE">🟫 Bronze</option>
                        <option value="SILVER">⚪ Silver</option>
                        <option value="GOLD">🟡 Gold</option>
                        <option value="PLATINUM">🟢 Platinum</option>
                        <option value="DIAMOND">💎 Diamond</option>
                    </select>
                </div>

                {/* LANE SELECTOR */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-textSecondary font-medium">Lane:</label>
                    <div className="grid grid-cols-3 gap-2">
                        {LANES.map((l) => (
                            <button
                                key={l.value}
                                onClick={() => setLane(l.value)}
                                className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                                    lane === l.value
                                        ? "bg-highlight text-background"
                                        : "bg-background hover:bg-accent border-2 border-accent/30"
                                }`}
                            >
                                {l.icon} {l.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* SEARCH BUTTON */}
                <Button variant="primary" onClick={handleSearch} className="py-3 text-lg">
                    🔎 Buscar Champion
                </Button>

                <div className="text-center text-xs text-textSecondary mt-2">
                    Pressione <kbd className="px-2 py-1 bg-accent rounded">Enter</kbd> para buscar rapidamente
                </div>
            </section>
        </main>
    );
}
