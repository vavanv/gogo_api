import dotenv from 'dotenv';

const DEFAULT_PORT = 8081;

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

interface Environment {
  logLevel: string;
  port: number | string;
  mongoDb: string;
}

export const environment: Environment = {
  logLevel: process.env.LOG_LEVEL || 'info',
  port: process.env.PORT || DEFAULT_PORT,
  mongoDb: process.env.MONGO_CONNECTION_STRING as string,
};
