import { useEffect, useState } from "react"

const LeaderBoardPage = () => {
    const [message, setMessage] = useState('Test');

    // On page open "subscribe" to leaderboard events
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:6969/leaderboard_event/200');
        // if (typeof(EventSource) !== 'undefined') {
        //     console.log("yay");
        // } else {
        //     console.log('boo');
        // }

        eventSource.onmessage = event => {
            const eventData = JSON.parse(event.data);
            setMessage(eventData.message)
        }

        eventSource.onerror = () => {
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    }, [])
    return (
        <div>
            <div>Message: {message}</div>
        </div>
    )
}

export default LeaderBoardPage