import { isNotEmpty, useForm } from '@mantine/form';
import { TextInput, Textarea, Select, Button, NumberInput } from '@mantine/core';
import { CreateEventDto, EventDto, EventType, EventsApi } from '../api';

interface IProps {
    row?:EventDto
    onClose: () => void
}


function SaveEvent(eventData:CreateEventDto, id?:number) {
    const eventsApi = new EventsApi();
    if (id)  {
        eventsApi.eventsControllerUpdateEvent(id, eventData)
        .catch((error) => {
            console.log(error)
        });
    } else {
    eventsApi.eventsControllerCreateEvent(eventData)
    .catch((error) => {
      console.log(error)
    });
    }
}
  
const CreateEventForm: React.FC<IProps> = ({row, onClose}) => {
    const form = useForm<CreateEventDto>({
    initialValues: {
        name: row?.name ?? '',
        description: row?.description ?? '',
        type: row?.type ?? EventType.App,
        priority: row?.priority ?? 1,
    },
    validate: {
        name: isNotEmpty("You must enter name"),
        description: isNotEmpty("You must enter description"),
        type: (value) => (Object.keys(EventType).includes(value) ? 'Invalid event type': null ) ,
        priority: (value) => (value < 10 && value < 1 ? 'Priority must be an integer between 1 and 10' : null),
    },

    });

  const eventTypeOptions = Object.values(EventType)

  return (
    <form onSubmit={form.onSubmit((values: CreateEventDto) => {SaveEvent(values, row?.id), onClose()})}>
      <TextInput
        label="Name"
        id="name"
        my="sm"
        {...form.getInputProps('name')}
      />
      <Textarea
        label="Description"
        id="description"
        my="sm"
        {...form.getInputProps('description')}
      />

      <Select
        label="Type"
        id="type"
        my="sm"
        data={eventTypeOptions} 
        {...form.getInputProps('type')}
      >
      </Select>

      <NumberInput
        my="sm"
        label="Priority"
        id="priority"
        min={1}
        max={10}
        {...form.getInputProps('priority')}
      >
      </NumberInput>

      <Button my="md" type="submit">Submit</Button>
    </form>
  );
};

export default CreateEventForm