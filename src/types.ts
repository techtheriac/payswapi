export interface ApiResponse<T = void> {
  success: boolean;
  response?: T;
  error?: { message: string };
  status: number;
}
