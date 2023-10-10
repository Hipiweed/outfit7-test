import {
  AppShell,
  Burger,
  Flex,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import EventTable from './components/eventTable.tsx';
import { Notifications } from '@mantine/notifications';

const queryClient = new QueryClient()


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
            <Burger opened={openedBurger} onClick={toggleBurger} hiddenFrom="sm" size="sm" />
            <Flex justify="center">
              <Title order={1}>Event Log App</Title>
            </Flex>
          </AppShell.Header>

          <AppShell.Navbar p="md"></AppShell.Navbar>

          <AppShell.Main>
            <EventTable></EventTable>
          </AppShell.Main>

        </AppShell>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
