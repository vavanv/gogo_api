import * as http from 'http';
import App from './app';
import dotenv from 'dotenv';

import { getLogger } from './logging';
import { environment } from './environment';

dotenv.config();

const logger = getLogger();
logger.info(`Logger configured with ${environment.logLevel} log level`);

App.set('port', environment.port);
const server = http.createServer(App);
server.listen(environment.port);

server.on('listening', function (): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${environment.port}`;
  logger.info(`Listening on ${bind}`);
});

module.exports = App;
