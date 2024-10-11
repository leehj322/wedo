import fetchExtended from "@/apis/fetchExtended";

export default async function page() {
  const res = await fetchExtended("/user");
  const json = await res.json();

  return <div>{JSON.stringify(json)}</div>;
}
