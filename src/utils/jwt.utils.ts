import jwt, { type SignOptions, type Secret } from 'jsonwebtoken';
import { config } from '@/config/index.config';

const jwtOptions: SignOptions = {
  algorithm: config.jwt.algorithm as SignOptions['algorithm'],
  expiresIn: config.jwt.expiresIn as SignOptions['expiresIn'],
};

const jwtSecret: Secret = config.jwt.secret;

export const generateToken = (payload: any) => {
  return jwt.sign(payload, jwtSecret, jwtOptions);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecret);
};
