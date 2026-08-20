import {Item, ItemDetails} from './item.model';
import {UserDetails} from './user.model';

export interface Sale {
  id: number;
  slug: string;
  startedAt: Date;
  endedAt: Date;
  startingPrice: number;
  currentPrice: number;
  likes: number;
  state: string;
  item: Item;
}

export interface SaleDetails extends Sale {
  createdAt: Date;
  item: ItemDetails;
  owner: UserDetails;
}
