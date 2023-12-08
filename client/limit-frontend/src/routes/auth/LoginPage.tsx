import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { useForm } from '@mantine/form';
import React from 'react';
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [visible, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate(-1);
    }
  }, [])

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const register = async () => {
    const { email, password } = form.values;

    const res = await fetch('http://localhost:6969/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email, password
      }),
      headers: {
          'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else if (data.token) {
      localStorage.setItem('token', data.token);
      navigate(-1);
    }
  }

  return (
    <Box maw={340} mx="auto">
      <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />

      <PasswordInput
        mt="md"
        label="Password"
        placeholder="Password"
        visible={visible}
        onVisibilityChange={toggle}
        {...form.getInputProps('password')}
      />

      <Group justify="center" mt="xl">
        <Button
          variant="contained"
          onClick={register}>
          Login
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Link to="/register">
          Haven't created an account yet? Sign up!
        </Link>
      </Group>
    </Box>
  );
}
