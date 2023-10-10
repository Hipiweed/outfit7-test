import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/entities/Event';
import { CreateEvent } from 'src/types/event-types';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private userRepo: Repository<Event>,   private httpService: HttpService) {}

  async getEvents() {
    const getEvent = await this.userRepo.find();
    return getEvent;
  }

  async createEvent(countryCode: string = "SL", eventDetails: CreateEvent) {
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

    // Check if ads are enabled
      const adsResponse = await firstValueFrom(this.httpService.get('https://us-central1-o7tools.cloudfunctions.net/fun7-ad-partner', {
      params: {
        countryCode
      },
      auth: {
        username: 'fun7user',
        password: 'fun7pass'
      }
    }));

      console.log(`🚀 ~ adsResponse.data.ads :`, adsResponse.data.ads )
      if(adsResponse.data.ads === 'you shall not pass!' ) 
      throw new Error ('you shall not pass!')
    
    const newEvent = this.userRepo.create(eventDetails);
    this.userRepo.save(newEvent);
  }

  async updateEvent(eventId: number, countryCode: string,  eventDetails: CreateEvent) {
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

        // Check if ads are enabled
        const adsResponse = await firstValueFrom(this.httpService.get('https://us-central1-o7tools.cloudfunctions.net/fun7-ad-partner', {
          params: {
            countryCode
          },
          auth: {
            username: 'fun7user',
            password: 'fun7pass'
          }
        }));

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
