export interface ErrorResponse {
  error: string;
  path: string;
  status: number;
  timestamp: string;
}

export interface TokenErrorResponse {
  status: number;
  message: string;
}
