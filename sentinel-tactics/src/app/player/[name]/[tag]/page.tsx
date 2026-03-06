import { Suspense } from "react";
import PlayerPage from "../../../components/Pages/PlayerPage";

export default function Page() {
    return (
        <Suspense fallback={<div className="p-4 text-center">Carregando...</div>}>
            <PlayerPage />
        </Suspense>
    );
}
