import { Suspense } from "react";
import HomePage from "./components/Pages/HomePage";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;
    return (
        <Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
            <HomePage searchParams={resolvedSearchParams} />
        </Suspense>
    );
}
