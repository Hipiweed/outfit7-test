import { isNotEmpty, useForm } from '@mantine/form';
import { CreateEventDto, EventDto, EventType, EventsApi } from '../api';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, NumberInput, Select, TextInput, Textarea, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

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
  const countryCode = await getCountryCode();
  if (id) {
    return eventsApi.eventsControllerUpdateEvent(id, countryCode, eventData);
  } else {
    return eventsApi.eventsControllerCreateEvent(countryCode, eventData);
  }
}

const CreateEventForm: React.FC<IProps> = ({ row, onClose }) => {
  const queryClient = useQueryClient();
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  const saveEventMutation = useMutation({
    mutationFn: async (values: CreateEventDto) => await saveEvent(values, row?.id),
    onSuccess() {
      queryClient.invalidateQueries(['event']);
      onClose();
      notifications.show({
        icon: checkIcon,
        color: 'teal',
        title: 'All good!',
        message: 'Everything is fine'
      });
    },

    onError() {
      notifications.show({
        icon: xIcon,
        color: 'red',
        title: 'Bummer!',
        message: 'Something went wrong, retry'
      });
    }
  });
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
      onSubmit={form.onSubmit(async (values: CreateEventDto) => saveEventMutation.mutate(values))}
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
