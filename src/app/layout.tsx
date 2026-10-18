import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hexfortsecurity.in"),
  title: { default: "Cybersecurity Services, VAPT & Security Audits | HexFort Security", template: "%s | HexFort Security" },
  description: "HexFort Security provides authorized web and network VAPT, configuration reviews, phishing simulations and scoped security assessments.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://hexfortsecurity.in",
    siteName: "HexFort Security",
    title: "Cybersecurity Services, VAPT & Security Audits | HexFort Security",
    description: "Authorized web and network VAPT, configuration reviews, phishing simulations and scoped security assessments.",
    images: ["/herojpeg.jpeg"],
  },
  twitter: { card: "summary_large_image", images: ["/herojpeg.jpeg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
