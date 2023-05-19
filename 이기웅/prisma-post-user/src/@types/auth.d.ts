export interface JwtPayload {
  id: string;
  name: string;
  role: string;
}

export interface JwtPayloadWithDate extends JwtPayload {
  iat: Date;
  exp: Date;
}

export interface JwtRefreshPayload extends JwtPayload {
  refreshToken: string;
}
