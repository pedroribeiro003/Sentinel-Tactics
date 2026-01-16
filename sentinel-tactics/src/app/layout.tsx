import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const exo = Exo_2({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Sentinel Tactics",
    description: "Competitive rankings & analytics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${exo.className} bg-background`}>
                <Header />

                {/* CONTAINER que limita o sticky */}
                <div className="flex justify-center px-4">
                    {/* Ad esquerdo */}
                    <aside className="hidden xl:block w-[160px] mr-6">
                        <div className="sticky top-28 h-[600px] bg-surface flex items-center justify-center text-xs text-textSecondary">
                            AD
                        </div>
                    </aside>

                    {/* Conteúdo */}
                    <main className="w-full max-w-[1100px]">{children}</main>

                    {/* Ad direito */}
                    <aside className="hidden xl:block w-[160px] ml-6">
                        <div className="sticky top-28 h-[600px] bg-surface flex items-center justify-center text-xs text-textSecondary">
                            AD
                        </div>
                    </aside>
                </div>

                {/* FOOTER fora do container */}
                <footer className="mt-24 border-t border-accent py-8 text-center text-sm text-textSecondary">
                    © {new Date().getFullYear()} Sentinel Tactics
                </footer>
            </body>
        </html>
    );
}
