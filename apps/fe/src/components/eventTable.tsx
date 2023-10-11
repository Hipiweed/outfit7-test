import { Table, ActionIcon, Container, Flex, Modal, Button, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CreateEventForm from './createEventForm';
import { EventDto, EventsApi } from '../api';

function deleteEvent(eventsApi: EventsApi, eventId: number) {
  return eventsApi.eventsControllerDeleteEvent(eventId);
}

const EventTable: React.FC = () => {
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDto | undefined>(undefined);

  const queryClient = useQueryClient();
  const eventsApi = new EventsApi();

  const getEvents = useQuery({
    queryKey: ['event'],
    queryFn: () => eventsApi.eventsControllerGetEvents()
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id: number) => await deleteEvent(eventsApi, id),
    onSuccess() {
      queryClient.invalidateQueries(['event']);
    },
    onError() {}
  });

  const rows = getEvents.data?.data?.map((event) => (
    <Table.Tr key={event.id}>
      <Table.Td>{event.name}</Table.Td>
      <Table.Td>{event.description}</Table.Td>
      <Table.Td>{event.type}</Table.Td>
      <Table.Td>{event.priority}</Table.Td>
      <Table.Td>
        <Flex gap="md">
          <ActionIcon
            styles={{ root: { backgroundColor: 'orange' } }}
            onClick={() => {
              setSelectedEvent(event);
              openModal();
            }}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            styles={{ root: { backgroundColor: 'red' } }}
            onClick={() => deleteEventMutation.mutate(event.id)}
          >
            <IconTrash />
          </ActionIcon>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container>
      <LoadingOverlay
        visible={getEvents.isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Flex justify={'end'}>
        <Button
          my="md"
          rightSection={<IconPlus />}
          onClick={() => {
            setSelectedEvent(undefined);
            openModal();
          }}
        >
          New Event
        </Button>
      </Flex>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Priority</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Modal opened={openedModal} onClose={closeModal} title="CreateEvent">
        <CreateEventForm row={selectedEvent} onClose={closeModal} />
      </Modal>
    </Container>
  );
};

export default EventTable;
