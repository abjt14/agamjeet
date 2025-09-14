import Navigation from "@/components/Navigation";
import clsx from "clsx";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Providers from "./providers";

const eb_garamond = localFont({
  src: [
    {
      path: "../../public/fonts/EBGaramond-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/EBGaramond-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-eb-garamond",
});

export const metadata = {
  title: "Agamjeet Singh | Math Enthusiast",
  description: "Agamjeet's personal website and blog.",
  openGraph: {
    title: "Agamjeet Singh | Math Enthusiast",
    description: "Agamjeet's personal website and blog.",
    url: "https://agamjeet.com/",
    locale: "en_IE",
    type: "website",
    images: [
      {
        url: "https://agamjeet.com/images/og-image.jpg",
        alt: "Agamjeet Singh | Math Enthusiast",
        width: 1440,
        height: 820,
      },
    ],
  },
  twitter: {
    title: "Agamjeet Singh | Math Enthusiast",
    description: "Agamjeet's personal website and blog.",
  },
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
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className=" font-sans relative">
      {/* <Script id="set-theme">
        {`
          if (window.localStorage.theme === 'dark' || (!('theme' in window.localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        `}
      </Script> */}
      <body
        className={clsx(
          eb_garamond.variable,
          "min-h-screen max-w-screen-lg mx-auto flex gap-24 flex-col items-center justify-start p-6 pb-12 sm:p-12 lg:p-24",
          "text-macaroni-and-cheese-800 bg-macaroni-and-cheese-100 selection:bg-cinder-800 selection:text-macaroni-and-cheese-300 dark:text-cinder-300 dark:bg-cinder-950 leading-7 dark:selection:bg-macaroni-and-cheese-300 dark:selection:text-indigo-950 overflow-x-hidden"
        )}
      >
        <Providers>
          <Navigation />
          {children}
          <Footer />
          <div
            className="absolute left-0 top-0 w-full h-full bg-repeat pointer-events-none z-50 opacity-75 dark:opacity-50 bg-[transparent_url('/noise.png')_repeat_0_0]"
            style={{
              background: "transparent url('/noise.png') repeat 0 0",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
