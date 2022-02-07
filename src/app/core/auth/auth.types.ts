import {User} from '../user/user.types';

export interface AuthResponse {
  access_token: string
  user: User
}

export interface SignInModel {
  username: string,
  password: string
}

export interface SignUpModel {
  email: string,
  phone: string,
  password: string
}
