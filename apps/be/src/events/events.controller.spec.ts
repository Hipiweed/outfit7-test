import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from '../entities/Event';
import { HttpModule } from '@nestjs/axios';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateEventDto } from './dtos/CreateEventDTO';

describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsService: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [EventsController],
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useClass: Repository,
        },
      ],
    }).compile();

    eventsController = module.get<EventsController>(EventsController);
    eventsService = module.get<EventsService>(EventsService);
  });

  describe('getEvents', () => {
    it('should return an array of events', async () => {
      const result = [];
      jest.spyOn(eventsService, 'getEvents').mockResolvedValue(result);

      expect(await eventsController.getEvents()).toBe(result);
    });
  });

  describe('createEvent', () => {
    it('should create a new event', async () => {
      const eventDto: CreateEventDto = {
        name: 'string',
        description: 'string',
        type: 'CROSSPROMO',
        priority: 0,
      };
      const result = void jest.spyOn(eventsService, 'createEvent').mockImplementation(() => result);

      expect(await eventsController.createEvent(eventDto, 'US')).toBe(result);
    });
  });

  // Add similar tests for updateEvent and deleteEvent
});
