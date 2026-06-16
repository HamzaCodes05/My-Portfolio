export interface LoginBody {
  username: string;
  password: string;
}

export interface RegisterBody {
  username: string;
  password: string;
  role?: string;
  picture?: string | null;
}

export interface AuthUser {
  id: number;
  name: string;
  role: string;
  picture?: string | null;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}
