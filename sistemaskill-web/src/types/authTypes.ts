export type AuthContextType = {
  isAuthenticated: () => unknown;
  logout: () => void;
  getToken: () => void;
  getUserId: () => void;
  getUsername: () => string | null;
  getUserLogin: () => string | null;
};

export type LoginResponse = {
  data: {
    token: string;
  };
};

export type LoginRequest = {
  login: string;
  password: string;
};

export type SignUpRequest = {
  login: string;
  password: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignUpFormValues = {
  email: string;
  password: string;
};

export type Token = {
  iss: string;
  sub: string;
  userId: string;
  role: string;
  exp: number;
};
