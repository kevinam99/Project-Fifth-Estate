const httpContext = require('express-http-context')
const winston = require('winston')

const dateTime = new Date().toISOString()
const requestIdFormat = winston.format((info, opts) => {
  const reqId = httpContext.get('reqId')
  info.reqId = reqId
  return info
})

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.json(),
    requestIdFormat()
  ),
  transports: [
    new winston.transports.File({
      filename: `${__dirname}/../../logs/app-${dateTime}.log`,
      handleExceptions: true,
      level: 'info',
      maxsize: 10000000,
      maxFiles: 50
    })
  ],
  exitOnError: false
})
 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(winston.format.simple(), winston.format.timestamp()),
    level: 'debug',
    handleExceptions: true
  }))
} else {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(winston.format.simple(), winston.format.timestamp()),
    level: 'warn',
    handleExceptions: true
  }))
}


module.exports = logger
