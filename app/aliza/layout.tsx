import { JetBrains_Mono, Source_Serif_4 } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-aliza",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif-aliza",
  subsets: ["latin"],
  display: "swap",
});

export default function AlizaLayout({
  children,
}: LayoutProps<"/aliza">) {
  return (
    <div
      className={`experiment experiment--aliza ${jetbrainsMono.variable} ${sourceSerif.variable}`}
    >
      {children}
    </div>
  );
}
