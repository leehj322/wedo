import { useMutation } from "@tanstack/react-query";

import { acceptInvitation } from "@/apis/group";

export function useAcceptInvitation() {
  return useMutation({
    mutationFn: (token: string) => acceptInvitation(token),
  });
}
