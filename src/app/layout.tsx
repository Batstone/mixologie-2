"use client";

import type { Metadata } from "next";

import { Provider } from "react-redux";
import { store } from "./lib/redux/store";

import { Ovo, Raleway } from "next/font/google";

import "./styles/global.css";

const ovo = Ovo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-primary",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-secondary",
});

/*
export const metadata: Metadata = {
  title: "Mixologie",
  description: "Craft the Perfect Cocktail",
};
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ovo.variable} ${raleway.variable}`}>
      <Provider store={store}>
        <body className="content-grid">{children}</body>
      </Provider>
    </html>
  );
}
