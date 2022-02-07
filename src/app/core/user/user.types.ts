export interface User extends UserInformation {
  email: string
  is_online: boolean
  balance: number
}

export interface UserInformation {
  first_name: string | null
  last_name: string | null
  phone_number: string | null
  country: string | null
  city: string | null
  currency: string | null
}
