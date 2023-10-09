import { Table, ActionIcon, Container, AppShell, Burger, Flex, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';


const events = [
  {
    name: 'Event 1',
    description: 'This is event 1',
    type: "APP",
    priority: 1
  },
  {
    name: 'Event 2',
    description: 'This is event 2',
    type: "APP",
    priority: 2
  },
  {
    name: 'Event 3',
    description: 'This is event 3',
    type: "APP",
    priority: 3
  }
];



const App: React.FC = () => {

  const [opened, { toggle }] = useDisclosure();

  const rows = events.map((event) => (
    <Table.Tr key={event.name}>
      <Table.Td>{event.name}</Table.Td>
      <Table.Td>{event.description}</Table.Td>
      <Table.Td>{event.type}</Table.Td>
      <Table.Td>{event.priority}</Table.Td>
      <Table.Td>
        <Flex gap="md">
          <ActionIcon><IconEdit /></ActionIcon>
          <ActionIcon><IconTrash /></ActionIcon>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <AppShell
    header={{ height: 60 }}
    navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    padding="md"
  >
    <AppShell.Header>
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Flex justify='center' ><Title order={1}>Event Log App</Title></Flex>
    </AppShell.Header>

    <AppShell.Navbar p="md"></AppShell.Navbar>

    <AppShell.Main>
      <Container>
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
  </AppShell>
    
  );
}

export default App;