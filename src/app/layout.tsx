import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradesBrain Dashboard",
  description: "Field service management for trades businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
