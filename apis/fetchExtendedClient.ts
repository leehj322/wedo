import returnFetch, { FetchArgs } from "return-fetch";

const fetchExtendedClient = returnFetch({
  baseUrl: "https://fe-project-cowokers.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
  interceptors: {
    request: async (args: FetchArgs) => {
      if (args[0] instanceof URL) {
        const url = args[0];
        const { pathname } = url;
        url.pathname = `/8-7${pathname}`;
      }

      return args;
    },
  },
});

export default fetchExtendedClient;
