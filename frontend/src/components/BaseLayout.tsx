import React from 'react';
import { AppShell, Header, Container, Group, Title, ActionIcon, useMantineColorScheme, rem } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      header={{ height: rem(60) }}
      padding="md"
    >
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group justify="space-between" h="100%">
            <Title 
              order={3}
              style={{
                background: 'linear-gradient(135deg, #9167b9 0%, #7a4da0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Leciona AI
            </Title>
            <ActionIcon
              variant="light"
              color="violet"
              onClick={() => toggleColorScheme()}
              size="lg"
              radius="md"
              aria-label="Toggle color scheme"
            >
              {colorScheme === 'dark' ? (
                <IconSun size={18} stroke={1.5} />
              ) : (
                <IconMoon size={18} stroke={1.5} />
              )}
            </ActionIcon>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main
        style={{
          background: colorScheme === 'dark' 
            ? 'linear-gradient(135deg, #1A1B1E 0%, #25262B 100%)' 
            : 'linear-gradient(135deg, #f8f9fa 0%, #f5f0ff 100%)',
          minHeight: '100vh',
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default BaseLayout;
