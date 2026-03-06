import { Suspense } from "react";
import TierListPage from "../components/Pages/TierListPage";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;
    return (
        <Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
            <TierListPage searchParams={resolvedSearchParams} />
        </Suspense>
    );
}
