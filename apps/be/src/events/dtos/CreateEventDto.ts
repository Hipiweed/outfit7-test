import { ApiProperty } from "@nestjs/swagger";
import { EVENT_TYPE, EventType } from "src/types/event-types";

export class CreateEventDto {
    @ApiProperty({ description: 'The name of the event.' })
    name: string;
  
    @ApiProperty({ description: 'The description of the event.' })
    description: string;
  
    @ApiProperty({ 
      description: 'The type of the event.', 
      enum: Object.values(EVENT_TYPE), 
      enumName: 'EventType' ,
      default: EVENT_TYPE.APP

    })
    type: EventType;
  
    @ApiProperty({ description: 'The priority of the event.', })
    priority: number;
  }