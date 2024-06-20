import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { RootLayoutWrapper } from "@/components/RootLayoutWrapper/RootLayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "IMS System",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} layout`}>
                <main>
                    <RootLayoutWrapper children={children} />
                </main>
            </body>
        </html>
    );
}
