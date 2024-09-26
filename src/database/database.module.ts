import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://no-me-hackees:givadgcqexLICxPg@checkout.y9bsm.mongodb.net/?retryWrites=true&w=majority&appName=checkout')],
  exports: [MongooseModule],
})
export class DatabaseModule {}