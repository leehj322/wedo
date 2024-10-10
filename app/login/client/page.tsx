"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import fetchExtendedClient from "@/apis/fetchExtendedClient";

export default function ClientPage() {
  const session = useSession();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetchExtendedClient("/user", {
        headers: {
          Authorization: `Bearer ${session.data?.accessToken}`,
        },
      });
      const json = await res.json();
      return json;
    },
    enabled: !!session.data?.accessToken,
    refetchInterval: 0,
  });
  // eslint-disable-next-line no-console
  console.log({ data });
  return <div />;
}
