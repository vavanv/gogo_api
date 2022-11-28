import winston, { format, Logger } from 'winston';
import { TransformableInfo } from 'logform';
import morgan from 'morgan';
import { RequestHandler } from 'express';
import { environment } from '../environment';

const DEFAULT_LOGGER = 'default-logger';

const logFormat = format.combine(
  format.timestamp(),
  format.printf(
    (info: TransformableInfo): string => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'black',
};

winston.addColors(colors);

winston.loggers.add(DEFAULT_LOGGER, {
  exitOnError: false,
  level: environment.logLevel,
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({
      format: logFormat,
      stderrLevels: ['emerg', 'alert', 'crit', 'error'],
      consoleWarnLevels: ['warning', 'notice'],
    }),
  ],
});

const getMorgan = (logger: winston.Logger): RequestHandler => {
  const stream = {
    write: (message: string): void => {
      // morgan adds a newline at the end of each log record
      logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
  };
  const morganLogFormat =
    ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent :response-time ms';

  return morgan(morganLogFormat, {
    stream,
    skip: ({ path }) => ['/health', '/liveness'].includes(path),
  });
};

const getLogger = (): Logger => winston.loggers.get(DEFAULT_LOGGER);

export { getLogger, getMorgan };
