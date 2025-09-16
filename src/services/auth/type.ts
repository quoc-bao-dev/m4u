export type UserRequest = {
  token: string
}

export type UserResponse = {
  result: boolean
  info: {
    id: number
    code: string
    fullname: string
    phone: string
    email: string | null
    prefix_phone: string | null
    sign_up_with: string | null
    address: string | null
    birthday: string
    gender: number
    created_at: string
    point: number
    account_balance: number
    customer_alepay_id: string | null
    password: boolean
    verify_phone: number
    number_cccd: string | null
    issued_cccd: string | null
    date_cccd: string | null
    number_passport: string | null
    issued_passport: string | null
    date_passport: string | null
    referral_code: string
    active: number
    avatar: string
  }
  message: string
}

export type LoginResponse = {
  result: boolean
  message: string
  id: number
  token: string
}

export type LoginRequest = {
  phone: string
  password: string
  type_login: string
}

export type SignUpRequest = {
  fullname: string
  phone: string
  birthday: string
  address: string
  gender: number
  id_product: string
  event: string
  key_code: string
}
