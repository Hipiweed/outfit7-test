import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event } from '../entities/Event';
import { HttpModule } from '@nestjs/axios';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateEventDto, EventDto } from './dtos/CreateEventDTO';
import { CreateEvent, EVENT_TYPE } from '../types/event-types';

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
      jest.spyOn(eventRepository, 'find').mockResolvedValue(mockEvents);
      const result = await eventsService.getEvents();
      expect(result).toEqual(mockEvents);
    });
  });

  describe('createEvent', () => {
    it('should create a new event', async () => {
      const mockEventDetails: CreateEvent = {
        name: 'New Event',
        description: 'This is a new event',
        type: EVENT_TYPE.APP,
        priority: 5,
      };
      const mockNewEvent: Event = {
        id: 1,
        ...mockEventDetails,
      };
      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(eventRepository, 'create').mockReturnValue(mockNewEvent);
      jest.spyOn(eventRepository, 'save').mockResolvedValue(mockNewEvent);

      const result = await eventsService.createEvent('SL', mockEventDetails);

      expect(result).toEqual(mockNewEvent);
      expect(eventRepository.findOne).toHaveBeenCalledWith({
        where: { name: mockEventDetails.name },
      });
      expect(eventRepository.create).toHaveBeenCalledWith(mockEventDetails);
      expect(eventRepository.save).toHaveBeenCalledWith(mockNewEvent);
    });

    it('should throw an error if event name already exists', async () => {
      const mockEventDetails: CreateEvent = {
        name: 'Existing Event',
        description: 'This is an existing event',
        type: EVENT_TYPE.CROSSPROMO,
        priority: 3,
      };
      const mockExistingEvent: Event = {
        id: 1,
        ...mockEventDetails,
      };
      jest.spyOn(eventRepository, 'findOne').mockResolvedValue(mockExistingEvent);

      await expect(eventsService.createEvent('SL', mockEventDetails)).rejects.toThrowError(
        'Event with the same name already exists',
      );
      expect(eventRepository.findOne).toHaveBeenCalledWith({
        where: { name: mockEventDetails.name },
      });
    });
  });

  describe('updateEvent', () => {
    beforeEach(() => {
      jest.spyOn(eventRepository, 'findOne').mockImplementation((query: any) => {
        if (query.where && query.where.id === 1) {
          return Promise.resolve(mockEvent);
        } else {
          return Promise.resolve(null);
        }
      });

      jest.spyOn(eventRepository, 'update').mockResolvedValue(updateResult);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should update an existing event', async () => {
      const createEventDtoWithValidPriority: CreateEventDto = {
        ...createEventDto,
        priority: 5,
      };

      const result = await eventsService.updateEvent(1, 'SL', createEventDtoWithValidPriority);

      expect(result).toEqual(updateResult);
      expect(eventRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(eventRepository.update).toHaveBeenCalledWith(
        { id: 1 },
        createEventDtoWithValidPriority,
      );
    });

    it('should throw an error if event is not found', async () => {
      await expect(eventsService.updateEvent(2, 'SL', createEventDto)).rejects.toThrowError(
        'Event not found',
      );

      expect(eventRepository.findOne).toHaveBeenCalledWith({ where: { id: 2 } });
    });
  });

  describe('deleteEvent', () => {
    beforeEach(() => {
      jest.spyOn(eventRepository, 'findOne').mockImplementation((query: any) => {
        if (query.where && query.where.id === 1) {
          return Promise.resolve(mockEvent);
        } else {
          return Promise.resolve(null);
        }
      });

      jest.spyOn(eventRepository, 'delete').mockResolvedValue(deletedResult);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should delete an existing event', async () => {
      const result = await eventsService.deleteEvent(1);

      expect(result).toEqual(deletedResult);

      expect(eventRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });

      expect(eventRepository.delete).toHaveBeenCalledWith(mockEvent);
    });

    it('should throw an error if event is not found', async () => {
      await expect(eventsService.deleteEvent(2)).rejects.toThrowError('Event not found');
      expect(eventRepository.findOne).toHaveBeenCalledWith({ where: { id: 2 } });
    });
  });
});
