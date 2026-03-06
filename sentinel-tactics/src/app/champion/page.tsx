import ChampionPage from "../components/Pages/ChampionsPage";

export default function Page({
    params,
    searchParams,
}: {
    params: { name: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    return <ChampionPage params={params} searchParams={searchParams} />;
}
