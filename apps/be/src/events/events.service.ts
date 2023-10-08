import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/entities/Event';
import { CreateEvent } from 'src/types/event-types';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
    constructor(@InjectRepository(Event) private userRepo: Repository<Event>){

    }

    
    getEvents(){}

    createEvent(eventDetails :CreateEvent){
        const newEvent = this.userRepo.create(eventDetails)
        this.userRepo.save(newEvent)
    }

}
