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
        <html lang="en" className="overflow-x-hidden">
            <body className={`${exo.className} bg-background overflow-x-hidden`}>
                <Header />

                <div className="flex justify-center px-2 sm:px-4">
                    <aside className="hidden xl:block w-[160px] mr-6">
                        <div className="sticky top-28 h-[600px] bg-surface flex items-center justify-center text-xs text-textSecondary">
                            AD
                        </div>
                    </aside>

                    <main className="w-full max-w-[1100px] min-w-0 overflow-x-hidden">{children}</main>

                    <aside className="hidden xl:block w-[160px] ml-6">
                        <div className="sticky top-28 h-[600px] bg-surface flex items-center justify-center text-xs text-textSecondary">
                            AD
                        </div>
                    </aside>
                </div>

                <footer className="mt-12 sm:mt-24 border-t border-accent py-6 sm:py-8 text-center text-xs sm:text-sm text-textSecondary">
                    © {new Date().getFullYear()} Sentinel Tactics
                </footer>
            </body>
        </html>
    );
}
