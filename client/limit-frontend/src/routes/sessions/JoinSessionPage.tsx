import { Button, Center, Container, Flex, Paper, TextInput } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinSessionPage() {
    const [value, setValue] = useState('');
    const navigate = useNavigate();


  return (
    <Paper withBorder style={{padding: '20px'}}>
        <Container>
            <Flex direction="column" align="center">
                <h2>
                    Join a room 
                </h2>
                <TextInput
                    size="md"
                    radius="md"
                    placeholder="Enter 4 digit code"
                    label="Session Code"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    style={{width: "100%", marginTop: '10px'}}
                    error={false}
                />
                <Button radius="xs" fullWidth onClick={e => navigate(`/join/${value}`)} style={{marginTop: '30px'}}>
                    Sip
                </Button>
            </Flex>
        </Container>
    </Paper>
  );
}