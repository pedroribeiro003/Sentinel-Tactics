import TierListPage from "../components/TierListPage";

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    return <TierListPage searchParams={searchParams} />;
}
