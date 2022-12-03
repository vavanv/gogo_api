import * as http from 'http';
import App from './app';
// import { environment } from './environment';
import { getLogger } from './logging';
import dotenv from 'dotenv';

dotenv.config();
const logger = getLogger();
logger.info(`Logger configured with ${process.env.LOG_LEVEL} log level`);

App.set('port', process.env.PORT);
const server = http.createServer(App);
server.listen(process.env.PORT);

server.on('listening', function (): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${process.env.PORT}`;
  logger.info(`Listening on ${bind}`);
});

module.exports = App;
