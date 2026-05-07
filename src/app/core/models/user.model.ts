export interface User {
  id: string;
  username: string;
  accessToken: string;
  expireAt: number;
  roles: string[];
}

export interface ProfileView {
  slug: string;
  firstname: string;
  lastname: string;
  image: string;
  phone: string;
  credit: number;
  createAt: Date
}

export interface UserPreview {
  firstname: string;
  lastname: string;
  slug: string;
  image: string;
  createAt: Date;
}
