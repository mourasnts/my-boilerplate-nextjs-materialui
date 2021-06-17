export interface Token {
  token: string;
  is_revoked: boolean;
  user: User;
}

export interface User {
  nome: string;
}
