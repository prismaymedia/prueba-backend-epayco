import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { envs } from 'src/config';

@Module({
  imports: [MongooseModule.forRoot(envs.mongoUri)],
  exports: [MongooseModule],
})
export class DatabaseModule {}
