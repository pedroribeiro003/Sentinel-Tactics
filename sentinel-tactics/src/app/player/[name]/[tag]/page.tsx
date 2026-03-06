import PlayerPage from "../../../components/Pages/PlayerPage";

export default function Page({
    params,
    searchParams,
}: {
    params: { name: string; tag: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    return <PlayerPage params={params} searchParams={searchParams} />;
}
