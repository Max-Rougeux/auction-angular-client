import {Category} from './category.model';
import {Image} from './image.model';

export interface Item {
  brand: string;
  model: string;
  isGem: boolean;
  category: Category;
  thumbnail: Image;
}

export interface ItemDetails extends Item {
  description: string;
  condition: string;
  year: number;
}
