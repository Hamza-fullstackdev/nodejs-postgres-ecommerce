import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import StoreProvider from "./store-provider";

const exo = Exo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Exclusive Store",
  description: "Your all in one shopping place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${exo.className} antialiased max-w-[1440px] mx-auto`}>
        <StoreProvider>
          <Header />
          <main className='max-w-6xl xl:max-w-7xl mx-auto px-4'>
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
