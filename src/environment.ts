import dotenv from 'dotenv';

const DEFAULT_PORT = 8081;

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

interface Environment {
  port: number | string;
  mongoDb: string;
  logLevel: string;
  openMetroLinxKey: string;
  openMetroLinxUrl: string;
}

export const environment: Environment = {
  port: process.env.PORT || DEFAULT_PORT,
  mongoDb: process.env.MONGO_CONNECTION_STRING as string,
  logLevel: process.env.LOG_LEVEL || 'info',
  openMetroLinxKey: process.env.OPEN_METROLINX_KEY as string,
  openMetroLinxUrl: process.env.OPEN_METROLINX_URL as string,
};
