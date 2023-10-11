import { AppShell, Burger, Group, Menu, MenuItem, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EventTable from './components/eventTable.tsx';
import { Notifications } from '@mantine/notifications';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [openedBurger, { toggle: toggleBurger }] = useDisclosure();

  return (
    <>
      <Notifications position="top-right" />
      <QueryClientProvider client={queryClient}>
        <AppShell
          header={{ height: 60 }}
          navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !openedBurger } }}
          padding="md"
        >
          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger
                mr="lg"
                opened={openedBurger}
                onClick={toggleBurger}
                hiddenFrom="sm"
                size="sm"
              />
              <Title order={2}>Event Log App</Title>
            </Group>
          </AppShell.Header>

          <AppShell.Navbar p="md">
            <Menu>
              <MenuItem
                style={{ backgroundColor: 'white', padding: '10px 20px', fontWeight: '700' }}
              >
                Home
              </MenuItem>
              <MenuItem
                style={{ backgroundColor: 'white', padding: '10px 20px', fontWeight: '700' }}
              >
                About
              </MenuItem>
              <MenuItem
                style={{ backgroundColor: 'white', padding: '10px 20px', fontWeight: '700' }}
              >
                Contact
              </MenuItem>
            </Menu>
          </AppShell.Navbar>

          <AppShell.Main>
            <EventTable></EventTable>
          </AppShell.Main>
        </AppShell>
      </QueryClientProvider>
    </>
  );
};

export default App;
