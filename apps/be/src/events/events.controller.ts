import { Body, Controller, Get, Post, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEventDto, EventDto } from './dtos/CreateEventDTO';
import { EventsService } from './events.service';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all events' })
  @ApiResponse({
    status: 200,
    description: 'Events successfully retrieved.',
    type: [EventDto],
  })
  async getEvents() {
    return await this.eventsService.getEvents();
  }

  @Post(':country')
  @ApiOperation({ summary: 'Create a new event' })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({
    status: 201,
    description: 'Event successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @Param('country') countryCode: string, 
    ) {
    return await this.eventsService.createEvent(countryCode, createEventDto);
  }

  @Put(':country/:id')
  @ApiOperation({ summary: 'Update an existing event' })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({
    status: 200,
    description: 'Event successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  async updateEvent(
    @Param('id', ParseIntPipe) eventId: number, 
    @Param('country') countryCode: string, 
    @Body() createEventDto: CreateEventDto
    ) { 
      console.log(`🚀 ~ countryCode:`, countryCode)
      return await this.eventsService.updateEvent(eventId, countryCode, createEventDto);

    }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an existing event' })
  @ApiResponse({
    status: 200,
    description: 'Event successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  async deleteEvent(@Param('id', ParseIntPipe) eventId: number) {
    return await this.eventsService.deleteEvent(eventId);
  }
}


