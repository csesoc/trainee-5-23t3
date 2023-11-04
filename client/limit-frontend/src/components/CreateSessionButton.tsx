import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function CreateSessionButton() {
    const navigate = useNavigate();
    const handleClick= async() => {
        try {
            const response = await fetch('http://localhost:6969/create_session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            // console.log(data.id)
            navigate(`/join/${data.id}`)
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