import {Item} from './item.model';
import {UserPreview} from './user.model';

export interface Sale {
  slug: string;
  startingPrice: number;
  currentPrice: number;
  startAt: Date;
  endAt: Date;
  likes: number;
  seller: UserPreview;
  item: Item
}

export interface SalePriceUpdate {
  slug: string;
  currentPrice: number;
}
