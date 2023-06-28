import { createConnection, ConnectionOptions } from 'typeorm';

export const connectDatabase = async () => {
  try {
    const connectionOptions: ConnectionOptions = {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/entities/*.ts'],
      synchronize: true,
    };

    await createConnection(connectionOptions);
    console.log('Connected to the database');
  } catch (error) {
    console.error('TypeORM connection error:', error);
  }
};