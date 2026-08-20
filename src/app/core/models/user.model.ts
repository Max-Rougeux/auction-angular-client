import {Image} from './image.model';

export interface User {
  slug: string;
  firstname: string;
  lastname: string;
  createdAt: Date;
  thumbnail: Image;
}

export interface UserDetails extends User {
  phone: string;
  credit: number;
  isAdmin: boolean;
}
