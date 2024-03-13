import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../config';

export class MongoClient {
  static create() {
    return MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => ({
        uri: configService.MONGO_DATABASE_URL,
        retryAttempts: 1000000,

        connectionFactory: (connection) => {
          console.log('Connection to mongoDB established');
          return connection;
        },

        connectionErrorFactory: (error) => {
          console.log('Error connecting to mongoDB');
          console.log(error);
          return error;
        },
      }),
      inject: [config.KEY],
    });
  }
}
