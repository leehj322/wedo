export interface AcceptInvitationResponse {
  groupId: number;
}

export interface AddTeamResponse {
  name: string;
  image: string;
  updatedAt: string;
  createdAt: string;
  id: number;
}

export interface GetTeamMemberResponse {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: "ADMIN" | "MEMBER";
}
