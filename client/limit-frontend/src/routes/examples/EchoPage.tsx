import { Group, Button, TextInput } from "@mantine/core";
import { useState } from "react";

export default function EchoPage() {
    // useState for inputValue
    const [inputValue, setInputValue] = useState('');
    // useState for echoedResponse, which will be displayed on screen
    const [echoedResponse, setEchoedResponse] = useState(null); 
    // useState for all echoes
    const [echoList, setEchoList] = useState(null);

    // fetch request to the backend
    const echoToggle = async () => {
        try {
            const response = await fetch('http://localhost:6969/echo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ startup: inputValue })
            });

            const data = await response.json();
            setEchoedResponse(data);
            console.log(data.echo);
        } catch (error) {
            console.error('Error sending data to echo:', error);
        }
    }

    const echoListToggle = async() => {
        try {
            const response = await fetch('http://localhost:6969/echo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            setEchoList(data);
            console.log(data.echo);
        } catch (error) {
            console.error('Error sending data to echo:', error);
        }
    }

    return (
        <>
            <Group justify="center">
                <TextInput
                    placeholder="Enter text to echo"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                />
                <Button 
                    variant="gradient" 
                    gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                    onClick={echoToggle}
                >
                    Wanna echo?
                </Button>

                {echoedResponse && <div className="echoed-response">
                    <pre>{JSON.stringify(echoedResponse.echo, null, 2)}</pre>
                </div>}
            </Group>

            <Button 
                variant="gradient" 
                gradient={{ from: 'red', to: 'purple', deg: 90 }}
                onClick={echoListToggle}
            >
                Show my Echoes
            </Button>

            <div>
                {echoList === null ? (
                    <>
                        howdy
                    </>
                ) : (
                    <>
                        {echoList.map((echobruh) => (
                            <div>
                                {echobruh['echoString']}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
