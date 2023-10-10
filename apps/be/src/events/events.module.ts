import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../entities/Event';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    HttpModule
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
