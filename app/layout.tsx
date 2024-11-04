import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/index.scss";
import SessionProvider from "./providers/sessionProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lendsqr",
  description:
    "Lendsqr is a LaaS that’s transforming lending in Africa by empowering small to large lenders with the tech stack they need to scale while providing their borrowers with an awesome loan experience",
  icons: "/images/favicon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
