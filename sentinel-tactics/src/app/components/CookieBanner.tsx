"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) setVisible(true);
    }, []);

    const accept = () => {
        localStorage.setItem("cookie_consent", "accepted");
        setVisible(false);
    };

    const decline = () => {
        localStorage.setItem("cookie_consent", "declined");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-surface border-t border-accent shadow-lg">
            <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                <p className="text-xs sm:text-sm text-textSecondary flex-1">
                    Usamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
                    <Link href="/terms" className="text-highlight underline hover:opacity-80 transition">
                        Política de Privacidade e Termos de Uso
                    </Link>
                    .
                </p>
                <div className="flex gap-2 flex-shrink-0">
                    <button
                        onClick={decline}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm border border-accent text-textSecondary hover:bg-accent transition"
                    >
                        Recusar
                    </button>
                    <button
                        onClick={accept}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm bg-highlight text-background font-bold hover:opacity-90 transition"
                    >
                        Aceitar
                    </button>
                </div>
            </div>
        </div>
    );
}
