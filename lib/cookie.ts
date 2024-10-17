"use server";

import { cookies } from "next/headers";

export async function getAccessToken() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  return accessToken?.value;
}
