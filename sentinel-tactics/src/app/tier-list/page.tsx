import ChampionTable, { ChampionRow } from "../components/Table";

const data: ChampionRow[] = [];

export default function TierListPage() {
    return (
        <main className="flex flex-col gap-4">
            <section className="flex flex-col gap-8 py-4">
                <h1 className="text-4xl">Tier List Page</h1>
                <ChampionTable data={data} />
            </section>
        </main>
    );
}
