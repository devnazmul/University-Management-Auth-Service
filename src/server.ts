import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errroLogger, logger } from './shared/logger';

let server: Server;

// HANDLE UNCAUGHT EXCEPTION
process.on('uncaughtException', error => {
  errroLogger.error(`💀 Uncaught exception is detected!`, error);
  process.exit(1);
});

async function boostrap() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    logger.info(`🛢 Database is connected successfully`);
    server = app.listen(config.PORT, () => {
      logger.info(`Application  listening on port ${config.PORT}`);
    });
  } catch (error) {
    errroLogger.error('💀 Failed to connect database', error);
  }

  // HANDLE UN-HANDLED REJECTION
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errroLogger.error(
          `💀 Unhandled rejection detected! server is closing after all process end .....`,
          error
        );
        process.exit(1);
      });
    } else {
      errroLogger.error(
        `💀 Unhandled rejection detected! server is closing .....`,
        error
      );
      process.exit(1);
    }
  });
}

// STARTING SERVER
boostrap();

// HANDLE SIGTERM
process.on('SIGTERM', () => {
  logger.info(`💀  SIGTERM is recived !`);
  if (server) {
    server.close();
  }
});
