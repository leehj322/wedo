import { useQuery } from "@tanstack/react-query";

import { getUser, getUserGroups } from "@/apis/user";
import { UserGroupsResponse, UserResponse } from "@/dtos/UserDtos";

export function useUserGroups() {
  return useQuery<UserGroupsResponse[]>({
    queryKey: ["user", "group"],
    queryFn: getUserGroups,
  });
}

export function useUser() {
  return useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: getUser,
  });
}
