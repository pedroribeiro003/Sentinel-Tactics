"use client";
import { use } from "react";
import {Button} from "../components/Button";
import { MatchHistory } from "../components/HistoryTable";
export default function PlayerPage() {
    
      const matches = [
    {
      id: "1",
      champion: "Ahri",
      result: "Win",
      duration: "28:41",
      kda: "12 / 3 / 9",
      cs: 212,
      gold: "14.2k",
      role: "Mid",
      damage: 32451,
      vision: 18,
      items: ["item1", "item2", "item3", "item4", "item5", "item6"],
    },
    {
      id: "2",
      champion: "Zed",
      result: "Loss",
      duration: "31:10",
      kda: "4 / 8 / 2",
      cs: 176,
      gold: "10.1k",
      role: "Mid",
      damage: 19211,
      vision: 11,
      items: ["item1", "item2", "item3"],
    },
  ];
    
    return (
        <main className="p-4 flex flex-col gap-8">
            <section className="flex flex-row gap-4 bg-surface p-4 ">
                <div className="w-24 h-24">
                    <img src="Logo.png" alt="playerImg" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-2xl ">
                        player name + #BR1
                    </h1>
                    <span className="text-textSecondary">
                        Region
                    </span>
                    <div className="py-2">
                        <Button variant="primary">Atualizar</Button>
                    </div>
                </div>
            </section>
            <section className="flex flex-col bg-surface p-4">
                <h2 className="text-xl mb-4">Ranqueada Solo/Duo</h2>
                <div className="p-4 flex flex-row gap-4">
                    <div className="w-32 h-24">
                        <img src="Logo.png" alt="Elo" />
                    </div>
                    <p className="flex items-center text-2xl">
                        Elo do jogador
                    </p>
                </div>
            </section>
            <section className="bg-surface p-4 ">
                <h2 className="text-xl mb-4">Histórico de Partidas</h2>
                <MatchHistory matches={matches} />
            </section>
        </main>
    );
}