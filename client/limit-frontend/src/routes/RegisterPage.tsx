import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { useForm } from '@mantine/form';
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [visible, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [])

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const register = async () => {
    const { name, email, password, confirmPassword } = form.values;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      throw new Error('Passwords do not match');
    } else {
      const res = await fetch('http://localhost:6969/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email, password, name
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
        navigate('/');
      }
    }
  }

  return (
    <Box maw={340} mx="auto">
      <TextInput mt="md" label="Name" placeholder="Name" {...form.getInputProps('name')} />
      <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />

      <PasswordInput
        mt="md"
        label="Password"
        placeholder="Password"
        visible={visible}
        onVisibilityChange={toggle}
        {...form.getInputProps('password')}
      />
      <PasswordInput
      
        label="Confirm password"
        placeholder="Confirm password"
        visible={visible}
        onVisibilityChange={toggle}
        {...form.getInputProps('confirmPassword')}
      />

      <Group justify="center" mt="xl">
        <Button
          variant="contained"
          onClick={register}>
          Register
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Group>
    </Box>
  );
}
