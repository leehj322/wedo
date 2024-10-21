import { useQuery, useMutation } from "@tanstack/react-query";

import { acceptInvitation, getTeam, addTeam, editTeam } from "@/apis/group";

export function useAcceptInvitation() {
  return useMutation({
    mutationFn: (token: string) => acceptInvitation(token),
  });
}

export function useGetTeam(groupId: number) {
  return useQuery({
    queryKey: ["team", groupId],
    queryFn: () => getTeam({ groupId }),
  });
}

export function useAddTeam() {
  return useMutation({
    mutationFn: ({ image, name }: { image: File; name: string }) =>
      addTeam({ image, name }),
  });
}

export function useEditTeam() {
  return useMutation({
    mutationFn: ({
      groupId,
      image,
      name,
    }: {
      groupId: number;
      image: File | string;
      name: string;
    }) => editTeam({ groupId, image, name }),
  });
}
