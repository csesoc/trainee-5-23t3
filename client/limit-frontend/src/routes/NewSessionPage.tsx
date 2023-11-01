import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NewSessionPage() {
    let { session } = useParams();
    let [ users, setUsers] = useState([])
     // On page open "subscribe" to leaderboard events
     useEffect(() => {
        const eventSource = new EventSource(`http://localhost:6969/session_wait_events/${session}`);

        eventSource.onmessage = event => {
            const eventData = JSON.parse(event.data);
            setUsers(eventData.users)
        }

        eventSource.onerror = () => {
            eventSource.close()
        }

        
        return () => {
            eventSource.close()
        }
    }, [])
    const listUsers = users.map(user => {
        return <div>{user}</div>
    })

    return (
       <>
        <h3>Session Id is {session} </h3>
        {listUsers}
       </>
    )
}