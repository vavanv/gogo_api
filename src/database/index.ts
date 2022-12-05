import mongoose, { ConnectOptions } from 'mongoose';
import { getLogger } from '../logging';

const logger = getLogger();

export const connect = (): void => {
  if (conn) {
    return;
  }

  const url = process.env.MONGO_CONNECTION_STRING as string;
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
