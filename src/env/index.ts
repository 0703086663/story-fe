import { getEnvSafely } from './config';

const MONGODB_URI = getEnvSafely('MONGODB_URI');
const ACCESS_TOKEN_SECRET = getEnvSafely('ACCESS_TOKEN_SECRET');
const REFRESH_TOKEN_SECRET = getEnvSafely('REFRESH_TOKEN_SECRET');

const env = {
  MONGODB_URI,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
};

export default env;
