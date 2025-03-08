import React from 'react';
import { Container, Tabs, Title, Card, Center, Box, Paper, rem } from '@mantine/core';
import { IconBook, IconFileText, IconListCheck, IconClipboardCheck } from '@tabler/icons-react';
import PlanoAula from './pages/PlanoAula';
import AssuntoContextualizado from './pages/AssuntoContextualizado';
import Questoes from './pages/Questoes';
import CorrecaoQuestoes from './pages/CorrecaoQuestoes';
import BaseLayout from './components/BaseLayout';

const App: React.FC = () => {
  return (
    <BaseLayout>
      <Container size="lg" py="xl">
        <Paper 
          shadow="lg" 
          radius="lg" 
          p="xl" 
          style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #f5f0ff 100%)',
            border: `${rem(1)} solid rgba(145, 103, 185, 0.1)`,
          }}
        >
          <Center mb="xl">
            <Title
              order={1}
              style={{
                color: '#9167b9',
                fontSize: rem(40),
                fontWeight: 800,
                letterSpacing: rem(-1),
                background: 'linear-gradient(135deg, #9167b9 0%, #7a4da0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              📚 LECIONA AI 🦉
            </Title>
          </Center>
          
          <Tabs 
            defaultValue="plano" 
            variant="pills"
            radius="xl"
            style={{ 
              marginTop: rem(20),
            }}
          >
            <Tabs.List 
              justify="center" 
              grow
              style={{
                gap: rem(12),
                backgroundColor: 'rgba(145, 103, 185, 0.05)',
                padding: rem(8),
                borderRadius: rem(16),
              }}
            >
              <Tabs.Tab value="plano" leftSection={<IconBook size={20} />}>
                Plano de Aula
              </Tabs.Tab>
              <Tabs.Tab value="assunto" leftSection={<IconFileText size={20} />}>
                Assunto Contextualizado
              </Tabs.Tab>
              <Tabs.Tab value="questoes" leftSection={<IconListCheck size={20} />}>
                Questões
              </Tabs.Tab>
              <Tabs.Tab value="correcao" leftSection={<IconClipboardCheck size={20} />}>
                Correção de Questões
              </Tabs.Tab>
            </Tabs.List>

            <Box mt={rem(24)}>
              <Tabs.Panel value="plano">
                <PlanoAula />
              </Tabs.Panel>
              <Tabs.Panel value="assunto">
                <AssuntoContextualizado />
              </Tabs.Panel>
              <Tabs.Panel value="questoes">
                <Questoes />
              </Tabs.Panel>
              <Tabs.Panel value="correcao">
                <CorrecaoQuestoes />
              </Tabs.Panel>
            </Box>
          </Tabs>
        </Paper>
      </Container>
    </BaseLayout>
  );
};

export default App;
