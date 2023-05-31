import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

const PORT = config.PORT;

const bootstrap = async () => {
  try {
    await mongoose.connect(config.DATABASE_CONNECTION_STRING as string);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Connection failed.`);
  }
};

bootstrap();
