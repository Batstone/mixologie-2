"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Provider } from "react-redux";
import { store } from "./lib/redux/store";

import "./globals.css";

/*
export const metadata: Metadata = {
  title: "Mixologie",
  description: "Craft the perfect Cocktail",
};
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className="content-grid">{children}</body>
      </Provider>
    </html>
  );
}
