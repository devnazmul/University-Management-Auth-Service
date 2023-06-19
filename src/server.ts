import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errroLogger, logger } from './shared/logger'

async function boostrap() {
  try {
    await mongoose.connect(config.DATABASE_URL as string)
    logger.info(`🛢 Database is connected successfully`)

    app.listen(config.PORT, () => {
      logger.info(`Application  listening on port ${config.PORT}`)
    })
  } catch (err) {
    errroLogger.error('Failed to connect database', err)
  }
}

boostrap()
