import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

async function boostrap() {
  try {
    await mongoose.connect(config.DATABASE_URL as string)
    console.log(`🛢   Database is connected successfully`)

    app.listen(config.PORT, () => {
      console.log(`Application  listening on port ${config.PORT}`)
    })
  } catch (err) {
    console.log('Failed to connect database', err)
  }
}

boostrap()
