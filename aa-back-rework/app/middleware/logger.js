import getHrTime from '../modules/getHrTime';

const ENV = process.env.NODE_ENV || 'development';

let logger = require('../modules/logger').createLogger({
  appName: 'logging-sample-app',
  logFile: __dirname + '/../logs/' + ENV + '.log',
  level: 'info'
});

export let loggerMiddleware = (req, res, next) => {
  let startTime = getHrTime();
  logger.info({ req: req }, 'request-data');
  let writeHead = res.writeHead;
  res.writeHead = function () { // => occurs error
    res._responseTime = getHrTime() - startTime;
    writeHead.apply(res, arguments);
  };
  
  // Log in to the finished requests.
  res.once('finish', () => {
    let responseTotalTime = getHrTime() - startTime;
    logger.info({
      res: res,
      reqId: req.reqId,
      responseTime: res._responseTime,
      responseTotalTime: responseTotalTime
    }, 'response-data');
  });

  next();
}