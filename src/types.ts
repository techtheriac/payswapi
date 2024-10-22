export interface ApiResponse<T> {
  success: boolean;
  response?: T;
  error?: { message: string };
  status: number;
}
