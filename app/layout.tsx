import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import GamingNavbar from "@/components/website/navbar";
import FooterMinimal from "@/components/website/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Primary metadata
  title: {
    default: "Color Prediction Game | Ocorom",
    template: "%s | Ocorom Color Game"
  },
  description: "Play the exciting Color Prediction Game on Ocorom. Predict colors, win virtual coins, and enjoy fast-paced gameplay with no real money involved. Free entertainment for everyone!",
  
  // Enhanced keywords with better targeting
  keywords: [
    "color prediction game",
    "online color game",
    "virtual coin game",
    "prediction games online",
    "free color prediction",
    "fun prediction game",
    "ocorom games",
    "entertainment games",
    "skill-based prediction",
    "color guessing game",
    "mobile color game",
    "browser game"
  ],
  
  // Enhanced authors
  authors: [
    { 
      name: "Ocorom",
      url: "https://ocorom.vercel.app" 
    }
  ],
  
  // Enhanced creator
  creator: "Ocorom Games Team",
  publisher: "Ocorom",
  
  // Enhanced robots with more directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Viewport optimization for mobile
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  
  // Theme color for PWA/browser theming
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4f46e5" },
    { media: "(prefers-color-scheme: dark)", color: "#3730a3" }
  ],
  
  // Open Graph enhanced
  openGraph: {
    title: "Color Prediction Game | Ocorom - Free Virtual Coin Game",
    description: "Enjoy fast and fun color prediction games using virtual coins. Built for smooth gameplay and entertainment. No downloads, no real money - just pure fun!",
    url: "https://ocorom.vercel.app/og.jpg",
    siteName: "Ocorom Games",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ocorom.vercel.app/og.jpg",
        width: 1200,
        height: 630,
        alt: "Ocorom Color Prediction Game Screenshot",
        type: "image/png",
        secureUrl: "https://ocorom.vercel.app/og.jpg",
      },
      {
        url: "https://ocorom.vercel.app/og.jpg",
        width: 1080,
        height: 1080,
        alt: "Ocorom Color Game - Mobile Preview",
        type: "image/png",
      }
    ],
    videos: [
      {
        url: "https://ocorom.vercel.app/videos/hero.mov",
        width: 1920,
        height: 1080,
        type: "video/mp4",
      }
    ],
  },
  
  // Twitter enhanced
  twitter: {
    card: "summary_large_image",
    title: "Color Prediction Game | Ocorom",
    description: "Predict colors, play smart, and enjoy virtual coin games on Ocorom. Free to play, no registration required!",
    images: {
      url: "https://ocorom.vercel.app/og.jpg",
      alt: "Play Color Prediction Game on Ocorom",
      width: 1200,
      height: 675,
    },
    creator: "@OcoromGames",
    site: "@Ocorom",
  },
  
  // Additional metadata
  alternates: {
    canonical: "https://ocorom.com/games/color",
    languages: {
      "en-US": "https://ocorom.com/games/color",
      "es-ES": "https://ocorom.com/es/juegos/color",
    },
  },
  
  // Category for app stores/game directories
  category: "game",
  
  // Enhanced icons for PWA
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#4f46e5",
      },
    ],
  },
  
  // Manifest for PWA
  manifest: "https://ocorom.com/manifest.json",
  
  // Apple specific
  appleWebApp: {
    capable: true,
    title: "Ocorom Color Game",
    statusBarStyle: "black-translucent",
  },
  
  // Format detection
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  
  // Additional SEO
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      me: ["https://ocorom.com/"],
    },
  },
  
 
  // Enhanced itunes for iOS
  itunes: {
    appId: "123456789",
    appArgument: "ocorom://games/color",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
                  <GamingNavbar />
            
            {children}
            <FooterMinimal />
          </ThemeProvider>
        </body>
      </html>
  );
}
