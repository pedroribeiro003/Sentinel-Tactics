import { Suspense } from "react";
import TierListPage from "../components/TierListPage";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TierListPage />
        </Suspense>
    );
}
