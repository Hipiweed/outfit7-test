import { useForm } from '@mantine/form';
import { TextInput, Textarea, Select, Button } from '@mantine/core';
import { CreateEventDto, EventType } from '../api';

const CreateEventForm: React.FC = () => {
  const form = useForm<CreateEventDto>({
    initialValues: {
      name: '',
      description: '',
      type: EventType.App,
      priority: 1,
    },
    validate: {
      name: (value) => value.trim().length > 0 || 'Name is required',
      description: (value) => value.trim().length > 0 || 'Description is required',
      type: (value) => Object.values(EventType).includes(value) || 'Invalid event type',
      priority: (value) => Number.isInteger(value) && value >= 1 && value <= 10 || 'Priority must be an integer between 1 and 10',
    },
  });

  const priorityOptions = [...Array(10)].map((_, index) => (index + 1).toString());
  const eventTypeOptions = Object.values(EventType)

  return (
    <form onSubmit={form.onSubmit((values: CreateEventDto) => console.log(values))}>
      <TextInput
        label="Name"
        id="name"
        {...form.getInputProps('name')}
      />
      <Textarea
        label="Description"
        id="description"
        {...form.getInputProps('description')}
      />
      <Select
        label="Type"
        id="type"
        data={eventTypeOptions}
        
        {...form.getInputProps('type')}
      >

      </Select>
      <Select
        label="Priority"
        id="priority"
        data={priorityOptions}
        {...form.getInputProps('priority')}
      >
      </Select>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreateEventForm