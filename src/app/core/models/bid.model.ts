import {User} from './user.model';

export interface Bid {
  id: number;
  amount: number;
  time: Date;
  slug: string;
  bidder: User;
}

export interface BidPoint {
  amount: number;
  time: Date;
  user: string;
}
