export interface SuccessResponse<T> {
  data: T
}

export interface AuthData {
  userId: number,
  token: string,
  expiresAt: string
}
