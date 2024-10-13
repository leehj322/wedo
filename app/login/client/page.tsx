"use client";

import { useQuery } from "@tanstack/react-query";

import fetchExtendedClient from "@/apis/fetchExtendedClient";

export default function ClientPage() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetchExtendedClient("/user");
      const json = await res.json();
      return json;
    },
    refetchInterval: 1000,
  });
  return <div>{JSON.stringify(data)}</div>;
}
