import * as http from 'http';
import App from './app';
import dotenv from 'dotenv';

import { getLogger } from './logging';
// import { environment } from './environment';
import { DEFAULT_PORT } from './environment';

dotenv.config();

const logger = getLogger();
logger.info(`Logger configured with ${process.env.LOG_LEVEL}`);

App.set('port', process.env.PORT || DEFAULT_PORT);
const server = http.createServer(App);
server.listen(process.env.PORT);

server.on('listening', function (): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${process.env.PORT}`;
  logger.info(`Listening on ${bind}`);
});

module.exports = App;
