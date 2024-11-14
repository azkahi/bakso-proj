import jwt from 'jsonwebtoken'

const JWT_SECRET_KEY = process.env.SECRET;

export function generate(payload: string): string {
  return jwt.sign(payload, JWT_SECRET_KEY);
}

export function decode(accessToken: string): jwt.JwtPayload | string {
  return jwt.verify(accessToken, JWT_SECRET_KEY);
}