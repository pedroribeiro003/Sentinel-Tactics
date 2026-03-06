import HomePage from "./components/Pages/HomePage";

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    return <HomePage searchParams={searchParams} />;
}
