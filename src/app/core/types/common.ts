export interface BreadcrumbItem {
  label: string;
  route?: string
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message: string;
  duration: number;
}

export type NotificationType = 'OUTBID' | 'NEW_FOLLOWER' | 'SALE_END';

export interface Notification {
  id?: number;
  type: NotificationType;
  time: Date;
  read: boolean;
  slug?: string;
  amount?: number;
}
