import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";

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
      <body className={`${exo.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
