import { Suspense } from "react";
import PlayerPage from "../../../components/Pages/PlayerPage";

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ name: string; tag: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    return (
        <Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
            <PlayerPage params={resolvedParams} searchParams={resolvedSearchParams} />
        </Suspense>
    );
}
