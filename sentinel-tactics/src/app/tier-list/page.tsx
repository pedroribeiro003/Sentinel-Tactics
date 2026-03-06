import TierListPage from "../components/Pages/TierListPage";

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    return <TierListPage searchParams={searchParams} />;
}
