import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from '../entities/Event';
import { HttpModule } from '@nestjs/axios';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateEventDto, EventDto } from './dtos/CreateEventDTO';

describe('EventsService', () => {
  let eventsService: EventsService;
  let eventRepository: Repository<Event>;

  const mockEvents: Event[] = [
    {
      id: 1,
      name: 'Test Event',
      description: 'Test Description',
      type: 'CROSSPROMO',
      priority: 0,
    },
    {
      id: 2,
      name: 'Test Event2',
      description: 'Test Description',
      type: 'CROSSPROMO',
      priority: 0,
    },
  ];

  const mockEvent: Event = {
    id: 1,
    name: 'Test Event',
    description: 'Test Description',
    type: 'CROSSPROMO',
    priority: 0,
  };

  const createEventDto: CreateEventDto = {
    name: 'Test Event',
    description: 'Test Description',
    type: 'CROSSPROMO',
    priority: 0,
  };

  const updateResult: UpdateResult = {
    raw: [],
    generatedMaps: [],
    affected: 1,
  };

  const deletedResult: DeleteResult = {
    raw: [],
    affected: 1,
  };

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
  
    eventsService = module.get<EventsService>(EventsService);
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(eventsService).toBeDefined();
  });

  describe('getEvents', () => {
    it('should return an array of events', async () => {
      // Mock the behavior of the eventRepository.find() method
      jest.spyOn(eventRepository, 'find').mockResolvedValue(mockEvents);

      // Call the getEvents() method
      const result = await eventsService.getEvents();

      // Assert that the result is an array of events
      expect(result).toEqual(mockEvents);
    });
  });

});
