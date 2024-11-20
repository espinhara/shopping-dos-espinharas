export interface User {
  _id: string;
  isActive: boolean;
  name: string;
  email: string;
  userType: string;
  password?: string;
}