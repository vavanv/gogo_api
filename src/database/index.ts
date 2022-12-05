import mongoose, { ConnectOptions } from 'mongoose';
// import { environment } from '../environment';
import dotenv from 'dotenv';
import { getLogger } from '../logging';
// import { env } from 'process';

const logger = getLogger();

dotenv.config();

export const connect = (): void => {
  if (conn) {
    return;
  }

  const url = process.env.MONGO_CONNECTION_STRING as string;
  logger.error(`Url ${url}`);
  if (!url) {
    logger.error('Mongo connection url is not provided');
  }

  const options: ConnectOptions = {
    bufferCommands: true,
  };

  conn = mongoose.createConnection(url, options);
  conn.once('open', async () => {
    logger.info('Connected to database');
  });

  conn.on('error', () => {
    logger.info('Error connecting to database');
  });
};

export const disconnect = (): void => {
  if (conn) {
    mongoose.disconnect();
    conn.once('close', async () => {
      logger.info('Disconnected from database');
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let conn: mongoose.Connection;
