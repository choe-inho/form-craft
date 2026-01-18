'use client'  // 추가

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import SideNavigation from "@/components/common/navigation/SideNavigation";
import { usePathname } from "next/navigation";

const roboto = Roboto({subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto"}); 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavigation = pathname === '/login' || pathname === '/signup' || pathname === '/create';  // 숨길 페이지들

  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        {!hideNavigation && <SideNavigation/>}
        {children}
      </body> 
    </html>
  );
}