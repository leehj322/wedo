import fetchExtended from "@/apis/fetchExtended";

export default async function page() {
  const res = await fetchExtended("/user");
  const json = await res.json();
  // eslint-disable-next-line no-console
  console.log({ json });

  return <div />;
}
