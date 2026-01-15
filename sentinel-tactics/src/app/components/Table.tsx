import Image from "next/image";

export type ChampionRow = {
  id: string;
  name: string;
  image: string;
  tierImage: string;
  winRate: number;
  pickRate: number;
  banRate: number;
  games: number;
};

type ChampionTableProps = {
  data: ChampionRow[];
};

export default function ChampionTable({ data }: ChampionTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-accent">
      {/* Header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 bg-surface px-4 py-3 text-sm text-textSecondary">
        <span>Champion</span>
        <span>Tier</span>
        <span>Taxa de Vitória</span>
        <span>Taxa de Escolha</span>
        <span>Taxa de Banimento</span>
        <span>Jogos</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-accent/40">
        {data.map((champion) => (
          <div
            key={champion.id}
            className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 px-4 py-4 hover:bg-surface/60 transition"
          >
            {/* Champion */}
            <div className="flex items-center gap-3">
              <Image
                src={champion.image}
                alt={champion.name}
                width={40}
                height={40}
                className="rounded"
              />
              <span className="font-medium">{champion.name}</span>
            </div>

            {/* Tier */}
            <Image
              src={champion.tierImage}
              alt="Tier"
              width={42}
              height={42}
            />

            {/* Win Rate */}
            <span>{champion.winRate}%</span>

            {/* Pick Rate */}
            <span>{champion.pickRate}%</span>

            {/* Ban Rate */}
            <span>{champion.banRate}%</span>

            {/* Games */}
            <span>{champion.games.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
