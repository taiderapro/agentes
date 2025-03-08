import {
  AppShell,
  Button,
  TextInput,
  Stack,
  Image,
  Title,
  Text,
  Container,
  Paper,
  Modal,
} from "@mantine/core";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconLogin, IconUserPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import lecionaai_logo from "../../assets/lecionaai_logo.svg";

const LandingPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const inputStyles = {
    input: {
      backgroundColor: "white",
      color: "black",
      border: "1px solid black",
      "&:focus": {
        borderColor: "#9167b9",
        boxShadow: "none",
      },
    },
  };

  const handleLogin = async () => {
    if (!email || !password) {
      notifications.show({
        color: "red",
        title: "Erro",
        message: "Preencha o email e a senha antes de entrar!",
      });
      return;
    }
    
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      if (response.token) {
        login(response.token);
        notifications.show({
          color: "green",
          title: "Sucesso",
          message: "Login realizado com sucesso!",
        });
        navigate("/app");
      }
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Erro de Login",
        message: error instanceof Error ? error.message : "Erro ao fazer login",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!registerEmail || !registerPassword) {
      notifications.show({
        color: "red",
        title: "Erro",
        message: "Preencha todos os campos para criar sua conta!",
      });
      return;
    }

    setRegisterLoading(true);
    try {
      const response = await registerUser(registerEmail, registerPassword);
      notifications.show({
        color: "green",
        title: "Sucesso",
        message: response.message,
      });
      setModalOpen(false);
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Erro ao cadastrar",
        message: error instanceof Error ? error.message : "Erro ao criar conta",
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <AppShell
      padding="md"
      style={{ backgroundColor: "white", color: "black", marginTop: "-20px" }}
    >
      <Container size="sm" mt="xl">
        <Stack align="center">
          <Image
            src={lecionaai_logo}
            alt="Logo da Empresa"
            style={{ width: "100px", height: "auto", padding: "12px" }}
          />
          <Title order={2} style={{ color: "#9167b9" }}>
            Leciona Ai
          </Title>
          <Text style={{ textAlign: "center", color: "#b995c3" }}>
            Sua aula pronta em um clique!
          </Text>
          <Paper
            withBorder
            shadow="md"
            p="lg"
            mt="lg"
            radius="md"
            style={{ width: "100%", backgroundColor: "white" }}
          >
            <Stack style={{ gap: "1rem" }}>
              <TextInput
                label="Email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                styles={inputStyles}
              />
              <TextInput
                label="Senha"
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                styles={inputStyles}
              />
              <Button
                fullWidth
                leftSection={<IconLogin size={20} />}
                onClick={handleLogin}
                loading={loading}
                color="violet"
              >
                Entrar
              </Button>
            </Stack>
          </Paper>
          <Text color="black" mt="lg" size="sm">
            Ainda não tem uma conta?{" "}
            <Button
              variant="outline"
              color="violet"
              size="xs"
              leftSection={<IconUserPlus size={14} />}
              onClick={() => setModalOpen(true)}
              styles={{ root: { borderColor: "#9167b9", color: "#9167b9" } }}
            >
              Criar Conta
            </Button>
          </Text>
        </Stack>
      </Container>
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Criar Conta"
        styles={{
          inner: {
            backgroundColor: "white",
            color: "black",
            border: "1px solid black",
          },
          header: {
            backgroundColor: "white",
            color: "black",
          },
          title: { color: "black" },
          body: { backgroundColor: "white", color: "black" },
        }}
      >
        <Container>
          <Stack style={{ gap: "1rem" }}>
            <TextInput
              label="Email"
              placeholder="Digite seu email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              styles={inputStyles}
            />
            <TextInput
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              styles={inputStyles}
            />
            <Button
              fullWidth
              leftSection={<IconUserPlus size={20} />}
              onClick={handleRegister}
              loading={registerLoading}
              color="violet"
            >
              Criar Conta
            </Button>
          </Stack>
        </Container>
      </Modal>
    </AppShell>
  );
};

export default LandingPage;
