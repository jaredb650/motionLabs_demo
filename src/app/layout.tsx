import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Bebas_Neue, Inter, Nunito, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Movement Labs — Lucy Marie Schmidt",
    template: "%s | Movement Labs",
  },
  description:
    "Movement Labs by Lucy Marie Schmidt — Berlin-based dance instructor and licensed physiotherapist specializing in Salsa On 1, Salsa On 2, and Modern Dance. Private lessons, group classes, workshops, and more.",
  keywords: [
    "dance instructor Berlin",
    "salsa lessons Berlin",
    "modern dance Berlin",
    "Lucy Marie Schmidt",
    "Movement Labs",
    "Salsa On 1",
    "Salsa On 2",
    "Graham technique",
    "physiotherapy dance",
    "private dance lessons",
    "group dance classes",
  ],
  authors: [{ name: "Lucy Marie Schmidt" }],
  creator: "Movement Labs",
  metadataBase: new URL("https://movement-labs.de"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://movement-labs.de",
    siteName: "Movement Labs",
    title: "Movement Labs — Lucy Marie Schmidt",
    description:
      "Berlin-based dance instructor and licensed physiotherapist specializing in Salsa On 1, Salsa On 2, and Modern Dance. 10+ years of training across NYC, Toronto, Buenos Aires, and Berlin.",
    images: [
      {
        url: "/images/hero/lucy_d6.webp",
        width: 1400,
        height: 933,
        alt: "Lucy Marie Schmidt performing an arabesque at golden hour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Movement Labs — Lucy Marie Schmidt",
    description:
      "Berlin-based dance instructor and physiotherapist. Salsa On 1, Salsa On 2, Modern Dance. Private lessons, group classes, workshops.",
    images: ["/images/hero/lucy_d6.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${bebas.variable} ${inter.variable} ${nunito.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
