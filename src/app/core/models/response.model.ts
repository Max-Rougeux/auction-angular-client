export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T | null;
  meta: Meta;
}

export interface LoginResponse {
  username: string;
  accessToken: string;
  expiresAt: Date,
  authorities: string[]
}

export interface Meta {
  page: number;
  size: number;
  total: number;
  pages: number;
}

export interface WSPriceUpdate {
  slug: string;
  price: number;
}
