import HomePage from "./components/HomePage";

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    return <HomePage searchParams={searchParams} />;
}
