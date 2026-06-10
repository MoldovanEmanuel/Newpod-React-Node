import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET ?? 'newpod-dev-secret-change-in-production';

export function signToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): jwt.JwtPayload {
  const decoded = jwt.verify(token, SECRET);
  if (typeof decoded === 'string') throw new Error('Invalid token payload');
  return decoded;
}
