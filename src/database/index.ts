import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import { getLogger } from '../logging';

const logger = getLogger();

dotenv.config();

export const connect = (): void => {
  if (connection) {
    return;
  }

  const url = process.env.MONGO_CONNECTION_STRING as string;
  // logger.info(`Url ${url}`);
  if (!url) {
    logger.error('Mongo connection url is not provided');
  }

  const options: ConnectOptions = {
    bufferCommands: true,
  };

  mongoose.connect(url, options);
  connection = mongoose.connection;
  connection.once('open', async () => {
    logger.info('Connected to database');
  });

  connection.on('error', () => {
    logger.info('Error connecting to database');
  });
};

export const disconnect = (): void => {
  if (connection) {
    mongoose.disconnect();
    connection.once('close', async () => {
      logger.info('Disconnected from database');
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let connection: mongoose.Connection;
