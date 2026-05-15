import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ruang Komentar - Bagikan Pikiranmu",
  description: "Website komentar komunitas berbasis Next.js dan Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
