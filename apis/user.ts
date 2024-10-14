import fetchExtended from "./fetchExtended";

export async function getUserGroups() {
  const res = await fetchExtended("/user/groups");
  const json = await res.json();
  return json;
}

export async function getUser() {
  const res = await fetchExtended("/user");
  const json = await res.json();
  return json;
}
