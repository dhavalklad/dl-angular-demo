export interface User {
  id?: number,
  firstName: string,
  lastName: string,
  email: string,
  password?: string,
  confirmPassword?: string,
  phone?: number,
  city?: string,
  about?: string,
  gender?: string
}
