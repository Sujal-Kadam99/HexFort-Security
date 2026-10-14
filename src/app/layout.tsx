import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HexFort Security | Think Like an Attacker. Build Like a Defender.",
  description: "Offensive and defensive cybersecurity services, VAPT, red teaming and blue teaming.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
