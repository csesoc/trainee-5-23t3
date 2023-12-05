import { Button, Center, Flex, TextInput } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinSessionPage() {
    const [value, setValue] = useState('');
    const navigate = useNavigate();


  return (
    <Center>
        <Flex direction="column" align="center">
            <h2>
                Add a room code
            </h2>
            <TextInput
                size="lg"
                radius="xs"
                placeholder="Enter 4 digit code"
                value={value}
                onChange={e => setValue(e.target.value)}
                error={false}
            />
            <Button onClick={e => navigate(`/join/${value}`)}>
                Join
            </Button>
        </Flex>

    </Center>
  );
}