import { ReactNode } from "react";
import { cookies } from "next/headers";
import { AUTH_KEY } from "@/constants/auth.constant";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | Rafl",
  description: "Generated by Rafl",
};

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  await getToken();

  return <>{children}</>;
}

async function getToken() {
  const nextCookies = await cookies(); // Get cookies object
  const cookie = nextCookies.get(AUTH_KEY); // Find cookie
  if (!cookie || !cookie.value) {
    redirect("/login");
  }
}
