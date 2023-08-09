declare namespace Express {
  export interface Request {
    user: {
      id: string;
      username: string;
      walletAddress: string;
      email?: string;
    };
  }
}
