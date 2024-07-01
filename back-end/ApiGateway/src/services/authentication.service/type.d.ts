export interface ICreateToken {
  email: string;
  id: number;
  username: string;
  osName?: string;
  browserName?: string;
  ipAddress: string;
}

export interface IToken {
  access_token: string;
  refresh_token: string;
}
