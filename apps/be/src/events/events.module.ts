import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/entities/Event';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
