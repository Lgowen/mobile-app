export const APP_NAME = 'mobile-app';

export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}
