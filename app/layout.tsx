import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: "Wedding Invitation - Sofiia & Andrzej",
  description:
    "You're invited to celebrate the wedding of Sofiia Havrilchenko and Andrzej Wójciak on June 13, 2026",
  openGraph: {
    title: "Wedding Invitation - Sofiia & Andrzej",
    description:
      "You're invited to celebrate the wedding of Sofiia Havrilchenko and Andrzej Wójciak on June 13, 2026",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 633,
        alt: "Wedding Invitation - Sofiia & Andrzej",
      },
    ],
    type: "website",
    siteName: "Wedding Invitation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Invitation - Sofiia & Andrzej",
    description:
      "You're invited to celebrate the wedding of Sofiia Havrilchenko and Andrzej Wójciak on June 13, 2026",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
