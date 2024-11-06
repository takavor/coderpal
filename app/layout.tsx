import type { Metadata } from "next";
import "./globals.css";
import { Karla } from "next/font/google";

// components
import Navbar from "./components/Navbar";

const karla = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "coderpal",
  description: "A forum for you to find your coder pal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${karla.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
