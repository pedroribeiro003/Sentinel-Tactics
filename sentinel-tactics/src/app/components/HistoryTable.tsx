"use client";

import { useState } from "react";

type Match = {
  id: string;
  champion: string;
  result: "Win" | "Loss";
  duration: string;

  kda?: string;
  cs?: number;
  gold?: string;
  damage?: number;
  vision?: number;
  items?: string[];
};

interface Props {
  matches: Match[];
}

const PAGE_SIZE = 10;

export function MatchHistory({ matches }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleMatches = matches.slice(0, visibleCount);

  return (
    <div className="space-y-3">
      {visibleMatches.map((match) => {
        const isWin = match.result === "Win";
        const isOpen = open === match.id;

        return (
          <div key={match.id}>
            {/* CARD */}
            <div
              onClick={() => setOpen(isOpen ? null : match.id)}
              className="
                relative flex items-center justify-between
                bg-surface border border-accent/30 rounded-md px-4 py-3
                hover:bg-accent/20 transition cursor-pointer
              "
            >
              {/* Barra Win/Loss */}
              <div
                className={`absolute left-0 top-0 h-full w-1 rounded-l-md ${
                  isWin ? "bg-highlight" : "bg-accent"
                }`}
              />

              {/* Champion */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded bg-accent/40" />
                <span className="text-textPrimary font-medium">
                  {match.champion}
                </span>
              </div>

              {/* Result + Duration */}
              <div className="flex items-center gap-6">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    isWin
                      ? "bg-highlight/30 text-highlight"
                      : "bg-accent/40 text-textSecondary"
                  }`}
                >
                  {match.result}
                </span>

                <span className="text-sm text-textSecondary tabular-nums">
                  {match.duration}
                </span>
              </div>
            </div>

            {/* EXPANSÃO */}
            {isOpen && (
              <div className="bg-background border border-t-0 border-accent/30 rounded-b-md px-6 py-4 animate-fadeIn">
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <Detail label="KDA" value={match.kda ?? "-"} />
                  <Detail label="CS" value={String(match.cs ?? "-")} />
                  <Detail label="Gold" value={match.gold ?? "-"} />
                  <Detail
                    label="Damage"
                    value={match.damage?.toLocaleString() ?? "-"}
                  />
                  <Detail label="Vision" value={String(match.vision ?? "-")} />
                </div>

                {match.items && (
                  <div className="mt-4">
                    <p className="text-xs text-textSecondary mb-2">Items</p>

                    <div className="flex gap-2">
                      {match.items.map((_, i) => (
                        <div
                          key={i}
                          className="h-10 w-10 rounded bg-surface border border-accent/40"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* BOTÃO MOSTRAR MAIS */}
      {visibleCount < matches.length && (
        <button
          onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
          className="
            w-full mt-4 py-2 rounded-md
            bg-accent text-textPrimary text-sm font-medium
            hover:bg-accentHover transition
          "
        >
          Mostrar mais
        </button>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-textSecondary">{label}</p>
      <p className="text-textPrimary font-medium">{value}</p>
    </div>
  );
}
