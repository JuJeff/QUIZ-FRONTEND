import "bootstrap/dist/css/bootstrap.min.css"; 

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Space Mission Tracker",
  description: "By Juan Jefferson",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "#121212", color: "white" }}>

        <div className="container py-4">
          {children}
        </div>
      </body>
    </html>
  );
}