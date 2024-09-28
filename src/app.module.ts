import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { PrismaModule } from './prisma/prisma.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
