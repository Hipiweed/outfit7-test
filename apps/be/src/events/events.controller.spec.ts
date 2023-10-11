import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from '../entities/Event';
import { HttpModule } from '@nestjs/axios';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateEventDto, EventDto } from './dtos/CreateEventDTO';

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

  describe('createEvent', () => {
    it('should create a new event', async () => {
      const createEventDto: CreateEventDto = {
        name: 'Test Event',
        description: 'Test Description',
        type: 'CROSSPROMO',
        priority: 0,
      };
      const countryCode = 'US';
      const createdEvent: EventDto = {
        id: 1,
        name: 'Test Event',
        description: 'Test Description',
        type: 'CROSSPROMO',
        priority: 0,
      };

      jest.spyOn(eventsService, 'createEvent').mockResolvedValue(createdEvent);

      const result = await eventsController.createEvent(createEventDto, countryCode);

      expect(result).toBe(createdEvent);
      expect(eventsService.createEvent).toHaveBeenCalledWith(countryCode, createEventDto);
    });
  });

  describe('updateEvent', () => {
    it('should update an existing event', async () => {
      const eventId = 1;
      const createEventDto: CreateEventDto = {
        name: 'Updated Event',
        description: 'Updated Description',
        type: 'CROSSPROMO',
        priority: 1,
      };
      const countryCode = 'US';
      const updateResult: UpdateResult = {
        raw: [],
        generatedMaps: [],
        affected: 1,
      };
      
      jest.spyOn(eventsService, 'updateEvent').mockResolvedValue(Promise.resolve(updateResult));
      

      jest.spyOn(eventsService, 'updateEvent').mockResolvedValue(updateResult);

      const result = await eventsController.updateEvent(eventId, countryCode, createEventDto);

      expect(result).toBe(updateResult);
      expect(eventsService.updateEvent).toHaveBeenCalledWith(eventId, countryCode, createEventDto);
    });
  });

  describe('deleteEvent', () => {
    it('should delete an existing event', async () => {
      const eventId = 1;
      const deletedResult: DeleteResult = {
        raw: [],
        affected: 1,
      };

      jest.spyOn(eventsService, 'deleteEvent').mockResolvedValue(deletedResult);

      const result = await eventsController.deleteEvent(eventId);

      expect(result).toBe(deletedResult);
      expect(eventsService.deleteEvent).toHaveBeenCalledWith(eventId);
    });
  });
});
