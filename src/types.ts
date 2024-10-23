export interface ApiResponse<T = void> {
  success: boolean;
  response?: T;
  error?: { message: string };
  status: number;
}

export interface QueryParams {
  search?: string;
  page?: string;
}
