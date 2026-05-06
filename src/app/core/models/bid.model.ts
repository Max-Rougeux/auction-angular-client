import {UserPreview} from './user.model';

export interface Bid {
  id?: number;
  amount: number;
  slug: string;
  time: Date;
  user: UserPreview;
}

export interface UserBid {
  id?: number;
  amount: number;
  slug: string;
  image: string;
  time: Date;
  highest: boolean;
}
