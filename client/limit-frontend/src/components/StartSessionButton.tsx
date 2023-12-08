import { Button } from '@mantine/core';

export default function StartSessionButton(props: {user: string, session: string }) {
    const handleClick= async() => {
        try {
            await fetch('http://localhost:6969/start_session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user": props.user, 
                    "session": props.session,
                })
            });
            // Navigation handled by the socket logic
        } catch (error) {
            console.error('Error sending data to echo:', error);
        }
    }
  return (
    <Button variant="filled" onClick={handleClick}>
        Start Session
    </Button>
  )
}