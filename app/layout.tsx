import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SmoothScrollProvider } from "./_components/smooth-scroll-provider";

export const metadata: Metadata = {
  title: "The Robot and Me",
  description:
    "An experimental exhibition catalogue. Each experiment is its own artwork, interface and set of constraints.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {/* Marks that JS is running so the motion layer may hide elements before
            animating them. Without it, content renders visible instead of blank. */}
        <Script id="motion-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add("js");`}
        </Script>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
