// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DBService } from './services/dbService';
import { EventsModule } from './events/events.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DBService,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    EventsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'fe', 'dist'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
