import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hexfortsecurity.in"),
  title: { default: "Cybersecurity Services, VAPT & Red Teaming | HexFort Security", template: "%s | HexFort Security" },
  description: "HexFort Security helps organizations improve cyber resilience with authorized VAPT, red teaming, blue teaming and security consulting.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://hexfortsecurity.in",
    siteName: "HexFort Security",
    title: "Cybersecurity Services, VAPT & Red Teaming | HexFort Security",
    description: "Authorized offensive and defensive security services to help organizations find weaknesses and strengthen defenses.",
    images: ["/herojpeg.jpeg"],
  },
  twitter: { card: "summary_large_image", images: ["/herojpeg.jpeg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
