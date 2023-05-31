import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), `.env`) });

export default {
  PORT: process.env.PORT,
  DATABASE_CONNECTION_STRING: process.env.DATABASE_CONNECTION_STRING,
};
