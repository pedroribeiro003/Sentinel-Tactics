import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import Header from "./components/Header";
import CookieBanner from "./components/CookieBanner";
import Link from "next/link";
import "./globals.css";

const exo = Exo_2({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Sentinel Tactics",
    description: "Competitive rankings & analytics",
    other: {
        "google-adsense-account": "ca-pub-3947974919054435",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" className="overflow-x-hidden">
            <body className={`${exo.className} bg-background overflow-x-hidden`}>
                <Header />

                {/* Banner mobile — abaixo do header, só no mobile/tablet */}
                <div className="xl:hidden w-full flex justify-center py-2 bg-background border-b border-accent">
                    <div className="w-full max-w-[728px] h-[90px] bg-surface flex items-center justify-center text-xs text-textSecondary rounded">
                        AD
                    </div>
                </div>

                <div className="flex justify-center px-2 sm:px-4">
                    {/* Aside esquerdo */}
                    <aside className="hidden xl:flex flex-col w-[300px] mr-6 flex-shrink-0">
                        <div className="sticky top-28 flex flex-col gap-4">
                            <div className="w-[300px] h-[250px] bg-surface flex items-center justify-center text-xs text-textSecondary rounded">
                                AD
                            </div>
                            <div className="w-[300px] h-[600px] bg-surface flex items-center justify-center text-xs text-textSecondary rounded">
                                AD
                            </div>
                        </div>
                    </aside>

                    <main className="w-full max-w-[1100px] min-w-0 overflow-x-hidden">
                        {children}

                        {/* Leaderboard dentro do conteúdo — todos os tamanhos */}
                        <div className="w-full flex justify-center my-6">
                            <div className="w-full max-w-[728px] h-[90px] bg-surface flex items-center justify-center text-xs text-textSecondary rounded">
                                AD
                            </div>
                        </div>
                    </main>

                    {/* Aside direito */}
                    <aside className="hidden xl:flex flex-col w-[300px] ml-6 flex-shrink-0">
                        <div className="sticky top-28 flex flex-col gap-4">
                            <div className="w-[300px] h-[250px] bg-surface flex items-center justify-center text-xs text-textSecondary rounded">
                                AD
                            </div>
                            <div className="w-[300px] h-[600px] bg-surface flex items-center justify-center text-xs text-textSecondary rounded">
                                AD
                            </div>
                        </div>
                    </aside>
                </div>

                <footer className="mt-12 sm:mt-24 border-t border-accent py-6 sm:py-8 text-textSecondary">
                    <div className="max-w-[1100px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs sm:text-sm">
                            © {new Date().getFullYear()} Sentinel Tactics. Não afiliado à Riot Games.
                        </p>
                        <div className="flex gap-4 text-xs sm:text-sm">
                            <Link href="/terms" className="hover:text-highlight transition">
                                Termos de Uso
                            </Link>
                            <Link href="/terms#privacidade" className="hover:text-highlight transition">
                                Privacidade
                            </Link>
                            <Link href="/terms#cookies" className="hover:text-highlight transition">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </footer>

                <CookieBanner />
            </body>
        </html>
    );
}
