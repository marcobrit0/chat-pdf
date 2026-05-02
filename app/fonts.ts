import {
  IBM_Plex_Mono,
  Inter,
  Montserrat,
  Roboto_Condensed,
} from "next/font/google";

/**
 * Apollo “Season Mix” stand-in: Montserrat at semi-bold weights for display headlines.
 * The design spec targets weight 550; the closest static weights are 500/600.
 */
export const fontSeasonMix = Montserrat({
  variable: "--font-season-mix",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

/** Apollo “Soehne” stand-in: Inter at 400 for body, UI, and navigation. */
export const fontSoehne = Inter({
  variable: "--font-soehne",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/** Apollo “Abc Diatype” stand-in: Roboto Condensed for compact labels and emphasis. */
export const fontAbcDiatype = Roboto_Condensed({
  variable: "--font-abc-diatype",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

/** Apollo “Founders Grotesk Mono” stand-in: IBM Plex Mono for code-like text. */
export const fontFoundersMono = IBM_Plex_Mono({
  variable: "--font-founders-grotesk-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
