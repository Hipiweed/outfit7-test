
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Event } from 'src/entities/Event';

@Injectable()
export class DBService implements TypeOrmOptionsFactory {
constructor(private configService: ConfigService) {}

createTypeOrmOptions(): TypeOrmModuleOptions {
return {
    type: 'mysql',
    host: this.configService.get<string>('DB_HOST'),
    port: 3306,
    username: this.configService.get<string>('DB_USER'),
    password: this.configService.get<string>('DB_PASS'),
    database: this.configService.get<string>('DB_DATABASE'),
    entities: [Event],
    synchronize: true,
};
}
}
