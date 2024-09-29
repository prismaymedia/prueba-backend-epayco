import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MoviesModule } from './movies/movies.module';
import { DatabaseModule } from './database/database.module';
import { SimilarYearModule } from './similar_year/similar_year.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [DatabaseModule, MoviesModule, SimilarYearModule, WebhookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
