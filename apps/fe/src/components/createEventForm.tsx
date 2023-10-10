import { isNotEmpty, useForm } from '@mantine/form';
import { TextInput, Textarea, Select, Button, NumberInput } from '@mantine/core';
import { CreateEventDto, EventDto, EventType, EventsApi } from '../api';
import axios from 'axios';

interface IProps {
  row?: EventDto;
  onClose: () => void;
}
async function getCountryCode() {
  try {
    const response = await axios.get('http://ip-api.com/json/?fields=countryCode');
    const countryCode = response.data.countryCode;
    return countryCode;
  } catch (error) {
    console.error('Error fetching country code:', error);
    return null;
  }
}

 async function saveEvent(eventData: CreateEventDto, id?: number) {
  const eventsApi = new EventsApi();
  const countryCode = await getCountryCode()
  if (id) {
    eventsApi.eventsControllerUpdateEvent(id, countryCode, eventData).catch((error) => {
      console.log(error);
    });
  } else {
    eventsApi.eventsControllerCreateEvent(countryCode, eventData,).catch((error) => {
      console.log(error);
    });
  }
}

const CreateEventForm: React.FC<IProps> = ({ row, onClose }) => {
  const form = useForm<CreateEventDto>({
    initialValues: {
      name: row?.name ?? '',
      description: row?.description ?? '',
      type: row?.type ?? EventType.App,
      priority: row?.priority ?? 1
    },
    validate: {
      name: isNotEmpty('You must enter name'),
      description: isNotEmpty('You must enter description'),
      type: (value) => (Object.keys(EventType).includes(value) ? 'Invalid event type' : null),
      priority: (value) =>
        value < 10 && value < 1 ? 'Priority must be an integer between 1 and 10' : null
    }
  });

  const eventTypeOptions = Object.values(EventType);

  return (
    <form
      onSubmit={form.onSubmit(async (values: CreateEventDto) => {
        await saveEvent(values, row?.id), onClose();
      })}
    >
      <TextInput label="Name" id="name" my="sm" {...form.getInputProps('name')} />
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
      ></Select>

      <NumberInput
        my="sm"
        label="Priority"
        id="priority"
        min={1}
        max={10}
        {...form.getInputProps('priority')}
      ></NumberInput>

      <Button my="md" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default CreateEventForm;
