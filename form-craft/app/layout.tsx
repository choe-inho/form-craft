import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import SideNavigation from "@/components/common/navigation/SideNavigation";

const roboto = Roboto({subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto"}); 

export const metadata: Metadata = {
  title: "Form Craft",
  description: "Create and share forms easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${roboto.variable} antialiased`}>
        <SideNavigation/>
        {children}
      </body>
    </html>
  );
}
