import bunyan from 'bunyan';

let logger;
let serializers = {};

serializers.req = req => {
  return {
    reqId: req.reqId,
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    ip: req.ip
  };
};

exports.serializers = serializers;

exports.createLogger = opts => {
  opts = opts || {};
  if (!logger) {
    logger = bunyan.createLogger({
      name: opts.appName,
      serializers: {
        req: serializers.req,
        res: bunyan.stdSerializers.res,
        err: bunyan.stdSerializers.err
      },
      streams: [{
        type: 'rotating-file',
        path: opts.logFile,
        period: '1d', // Daily rotation.
        count: 3, // Keep three back copies.
        level: opts.level || 'info'
      }]
    });
  }
  return logger;
};