import {Category} from './category.model';

export interface Item {
  name: string;
  description: string;
  image: string;
  category: Category;
  isGem: boolean;
}
