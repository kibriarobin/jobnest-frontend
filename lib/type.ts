export const Role = {
  CANDIDATE: 'CANDIDATE',
  EMPLOYER: 'EMPLOYER',
  ADMIN: 'ADMIN',
} as const;

export type TRole = (typeof Role)[keyof typeof Role];

export type IUser = {
  id: string;
  name: string;
  email: string;
  role: TRole;
  profilePhoto?: string | null;
  isVerified: boolean;
};