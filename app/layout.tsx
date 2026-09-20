import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono, Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/ui/LenisProvider";
import Preloader from "@/components/ui/Preloader";


const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0e0e0e",
};

export const metadata: Metadata = {
  title: "SPHUR — Creative Agency | Web · Video · Social",
  description:
    "SPHUR is a creative agency building websites that load fast and land hard, videos that earn attention, and social that compounds. We give you a position, not just a deliverable.",
  keywords: [
    "creative agency",
    "web development",
    "video editing",
    "social media marketing",
    "SPHUR",
    "brand identity",
  ],
  authors: [{ name: "SPHUR" }],
  creator: "SPHUR Creative Agency",
  metadataBase: new URL("https://sphur.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sphur.com",
    title: "SPHUR — Creative Agency | Web · Video · Social",
    description:
      "We build things people actually remember. Website development, video editing, and social media marketing — done without compromise.",
    siteName: "SPHUR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SPHUR Creative Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SPHUR — Creative Agency",
    description:
      "We build things people actually remember.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SPHUR",
  description:
    "Creative agency specializing in website development, video editing, and social media marketing.",
  url: "https://sphur.com",
  logo: "https://sphur.com/images/sphur-logo-orange.png",
  image: "https://sphur.com/og-image.jpg",
  email: "hello@sphur.com",
  sameAs: [
    "https://instagram.com/sphur",
    "https://twitter.com/sphur",
    "https://linkedin.com/company/sphur",
    "https://behance.net/sphur"
  ],
  serviceType: [
    "Website Development",
    "Video Editing",
    "Social Media Marketing",
  ],
  areaServed: "Worldwide",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${cormorant.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`#preloader-overlay { display: none !important; }`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-orange focus:text-milk focus:font-mono focus:text-xs focus:font-bold focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <LenisProvider>
          <Preloader />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
