import { EVENT_TYPE, EventType } from '../types/event-types';
import { Entity, PrimaryGeneratedColumn, Column, Check } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Object.values(EVENT_TYPE),
    default: EVENT_TYPE.APP,
  })
  type: EventType;

  @Column({ default: 1 })
  @Check('priority >= 1 AND priority <= 10')
  priority: number;
}
