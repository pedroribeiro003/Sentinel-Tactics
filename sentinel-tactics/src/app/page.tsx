import ChampionTable, { ChampionRow } from "./components/Table";

const mockData: ChampionRow[] = [
    {
        id: "aatrox",
        name: "Aatrox",
        image: "/champions/aatrox.png",
        tierImage: "/tiers/s.png",
        winRate: 50,
        pickRate: 12,
        banRate: 18,
        games: 12450,
    },
    {
        id: "aatrox-2",
        name: "Aatrox",
        image: "/champions/aatrox.png",
        tierImage: "/tiers/s.png",
        winRate: 52,
        pickRate: 14,
        banRate: 21,
        games: 15800,
    },
    {
        id: "aatrox-3",
        name: "Aatrox",
        image: "/champions/aatrox.png",
        tierImage: "/tiers/s.png",
        winRate: 52,
        pickRate: 14,
        banRate: 21,
        games: 15800,
    },
];

export default function HomePage() {
    return (
        <main className="flex flex-col gap-4">
            <section className="flex flex-col gap-8 py-4">
                <h1 className="text-4xl">Ranked Performance Intelligence</h1>
                <div className="flex flex-row ">
                    <div className="flex w-1/3 ">
                        <img src="/Logo.png" alt="logo" />
                    </div>
                    <p className=" text-textPrimary text-lg justify-center items-center w-3/4 flex">
                        Sentinel Tactics é uma plataforma de análise competitiva focada em desempenho ranqueado.
                        Reunimos dados confiáveis, histórico consistente e leitura clara de performance para quem
                        valoriza informação precisa.
                    </p>
                </div>
            </section>
            <section className="flex flex-col py-4 gap-4">
                <h1 className="text-4xl">Statistic</h1>
                <ChampionTable data={mockData} />
            </section>
        </main>
    );
}
