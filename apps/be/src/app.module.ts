// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DBService } from './services/dbService';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DBService,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
