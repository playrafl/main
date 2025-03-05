import Head from "next/head";
import "./globals.css";
import type { Metadata } from "next";
import AppProvider from "@/store/app.store";
import { ReactNode } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Rafl",
  description: "Generated by Rafl",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <AppProvider>
        <body suppressHydrationWarning={true}>
          <Toaster />
          <DefaultLayout>{children}</DefaultLayout>
        </body>
      </AppProvider>
    </html>
  );
}
