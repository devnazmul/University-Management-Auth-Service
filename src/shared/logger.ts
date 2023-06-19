import path from 'path'
import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, label, printf, prettyPrint } = format

// CUSTOM FORMAT
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minuite = date.getMinutes()
  const sec = date.getSeconds()
  return `${date.toDateString()} ~ ${hour}:${minuite}:${sec} [${label}] [${level}] : ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Auth Service' }),
    timestamp(),
    prettyPrint(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'auth-service-success-%DATE%-.log'
      ),
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const errroLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'Auth Service' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'auth-service-error-%DATE%-.log'
      ),
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { errroLogger, logger }
