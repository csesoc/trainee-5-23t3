import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function StartSessionButton(props: {user: string, session: string }) {
    const navigate = useNavigate();
    const handleClick= async() => {
        try {
            const response = await fetch('http://localhost:6969/start_session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user": props.user, 
                    "session": props.session,
                })
            });

            const data = await response.json();
        } catch (error) {
            console.error('Error sending data to echo:', error);
        }
    }
  return (
    <Button variant="filled" onClick={handleClick}>
        Button
    </Button>
  )
}