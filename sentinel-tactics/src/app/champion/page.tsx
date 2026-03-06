import { Suspense } from "react";
import ChampionPage from "../components/Pages/ChampionsPage";

export default function Page() {
    return (
        <Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
            <ChampionPage />
        </Suspense>
    );
}
