"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import Script from "next/script"; // Import the Script component
// import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({

  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
    <head>
      {/* Google Analytics */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-7Y690164Q2"
        onError={() =>
          console.error("Google Analytics script failed to load.")
        }
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7Y690164Q2', {
              debug_mode: ${process.env.NODE_ENV === "development"}
            });
          `,
        }}
      />

<meta property="og:type" content="website" />
        <meta property="og:title" content="Ismart international Ghana" />
        <meta property="og:description" content="Discover iSmart, Africa's trusted partner for Bulk SMS, USSD, Digital Payments, & Toll-Free solutions. Simplify communication & grow your business today" />
        <meta property="og:image" content="https://ismartghana.com/your-image.jpg" />
        <meta property="og:url" content="https://ismartghana.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ismart international ghana" />
        <meta name="twitter:description" content="Discover iSmart, Africa's trusted partner for Bulk SMS, USSD, Digital Payments, & Toll-Free solutions. Simplify communication & grow your business today" />
        <meta name="twitter:image" content="https://ismartghana.com/your-image.jpg" />
        <meta name="twitter:url" content="https://x.com/ismartgh" />
    </head>
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
