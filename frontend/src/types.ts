// Auth0 user object
export type User = {
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string; // url to picture
  sub: string;
  updated_at: Date;
};
