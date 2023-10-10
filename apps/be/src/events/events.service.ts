import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/entities/Event';
import { CreateEvent } from 'src/types/event-types';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private userRepo: Repository<Event>) {}

  async getEvents() {
    const getEvent = await this.userRepo.find();
    return getEvent;
  }

  async createEvent(eventDetails: CreateEvent) {
    const { name, priority } = eventDetails;

    // Check if the name is unique
    const existingEvent = await this.userRepo.findOne({ where: { name } });
    if (existingEvent) {
      throw new Error('Event with the same name already exists');
    }

    // Check if the priority is between 1 and 10
    if (priority < 1 || priority > 10) {
      throw new Error('Priority must be between 1 and 10');
    }

    const newEvent = this.userRepo.create(eventDetails);
    this.userRepo.save(newEvent);
  }

  async updateEvent(eventId: number, eventDetails: CreateEvent) {
    const { name, priority } = eventDetails;

    // Retrieve the existing event
    const existingEvent = await this.userRepo.findOne({
      where: { id: eventId },
    });

    if (!existingEvent) {
      throw new Error('Event not found');
    }

    // Check if the name has changed
    if (existingEvent.name !== name) {
      // Check if the new name is unique
      const eventWithNewName = await this.userRepo.findOne({ where: { name } });
      if (eventWithNewName) {
        throw new Error('Event with the same name already exists');
      }
    }

    // Check if the priority is between 1 and 10
    if (priority < 1 || priority > 10) {
      throw new Error('Priority must be between 1 and 10');
    }

    // Update the event
    return await this.userRepo.update({ id: eventId }, { ...eventDetails });
  }

  async deleteEvent(eventId) {

        // Retrieve the existing event
        const existingEvent = await this.userRepo.findOne({
          where: { id: eventId },
        });
    
        if (!existingEvent) {
          throw new Error('Event not found');
        }
    return this.userRepo.delete(existingEvent)
  }
}
