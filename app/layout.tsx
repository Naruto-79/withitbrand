import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./componenets/Navbar";
import CartProvider from "./componenets/Providers";
import ShoppingCartModal from "./componenets/ShoppingCartModal";
import { ToastProvider } from "@/components/ui/toast";
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
  title: "With it",
  description: "With it is a fashion theme for presents a complete wardrobe of uniquely crafted Ethnic Wear, Casuals, Edgy Denims, & Accessories inspired from the most contemporary",
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
        <ToastProvider>
          <CartProvider>
            <Navbar />
            <ShoppingCartModal />
            {children}
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
