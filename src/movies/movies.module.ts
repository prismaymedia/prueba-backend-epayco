import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

import { MoviesService } from './movies.service';
import { SimilarYearService } from './similar_year.service';
import { WebhookService } from './webhook.service';

import { MoviesController } from './movies.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [MoviesService, SimilarYearService, WebhookService],
  controllers: [MoviesController],
})
export class MoviesModule {}
