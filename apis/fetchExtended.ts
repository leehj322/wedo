import returnFetch, { FetchArgs } from "return-fetch";

import { auth } from "@/auth";

const fetchExtended = returnFetch({
  baseUrl: "https://fe-project-cowokers.vercel.app",
  headers: {
    "Content-Type": "application/json",
    credentials: "include",
  },
  interceptors: {
    request: async (args: FetchArgs) => {
      if (args[0] instanceof URL) {
        const url = args[0];
        const { pathname } = url;
        url.pathname = `/8-7${pathname}`;
      }
      const session = await auth();
      const accessToken = session?.accessToken;

      if (accessToken) {
        if (args[1]?.headers) {
          const { headers } = args[1];
          const headerInit: HeadersInit = new Headers(headers);
          headerInit.set("Authorization", `Bearer ${accessToken}`);
          const newArgs: FetchArgs = [
            args[0],
            {
              ...args[1],
              headers: headerInit,
            },
          ];
          return newArgs;
        }
      }
      return args;
    },
  },
});

export default fetchExtended;
