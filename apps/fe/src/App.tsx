import { Table, ActionIcon, Container, AppShell, Burger, Flex, Title, Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { EventsApi, EventDto } from './api/api.ts';
import { useEffect, useState } from 'react';
import CreateEventForm from './components/createEventForm.tsx';




const App: React.FC = () => {

  const [openedBurger, { toggle:toggleBurger }] = useDisclosure();
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [events, setEvents] = useState<EventDto[]>()
  const [selectedEvent, setSelectedEvent] = useState<EventDto | undefined>(undefined);


  const eventsApi = new EventsApi();

  useEffect(() => {
    eventsApi.eventsControllerGetEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  const rows = events?.map((event) => (
    <Table.Tr key={event.id}>
      <Table.Td>{event.name}</Table.Td>
      <Table.Td>{event.description}</Table.Td>
      <Table.Td>{event.type}</Table.Td>
      <Table.Td>{event.priority}</Table.Td>
      <Table.Td>
        <Flex gap="md">
          <ActionIcon onClick={() => {
            setSelectedEvent(event) 
            openModal()
          }}><IconEdit /></ActionIcon>
          <ActionIcon><IconTrash /></ActionIcon>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <AppShell
    header={{ height: 60 }}
    navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !openedBurger } }}
    padding="md"
  >
    <AppShell.Header>
      <Burger opened={openedBurger} onClick={toggleBurger} hiddenFrom="sm" size="sm" />
      <Flex justify='center' ><Title order={1}>Event Log App</Title></Flex>
    </AppShell.Header>

    <AppShell.Navbar p="md"></AppShell.Navbar>

    <AppShell.Main>
      <Container>
        <Flex justify={'end'}>
          <Button my="md" rightSection={<IconPlus />} onClick={() => {
            setSelectedEvent(undefined) 
            openModal()
          }}>New Event</Button>
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
      </Container>
    </AppShell.Main>

    <Modal opened={openedModal} onClose={closeModal} title="CreateEvent">
    <CreateEventForm row={selectedEvent} onClose={closeModal}/>
    </Modal>
  </AppShell>
    
  );
}

export default App;