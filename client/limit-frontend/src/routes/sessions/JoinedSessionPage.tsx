import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import StartSessionButton from "../../components/StartSessionButton";
import { Button, Container, Flex, Paper, TextInput } from "@mantine/core";


const userId = Math.floor(Math.random()*1000).toString()

export default function JoinedSessionPage() {
  let { session } = useParams();
  session = session as string; 
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const socket = io("http://localhost:6969/wait", {
      query: {
      "user": userId,
      "session": session
      }
    })

    function onConnect() {
      console.log("connected")
    }

    function onMessage(message: any) {
      console.log(message)
    }

    function onData(data: any) {
      setUsers(data)
    }

    function onStartSession() {
      socket.disconnect()
      navigate(`/live/${session}`)
    }

    function onDisconnect() {
      navigate('/')
    }

    socket.on('connect', onConnect)
    socket.on('message', onMessage)
    socket.on('data', onData)
    socket.on('start-session', onStartSession)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('message', onMessage)
      socket.off('data', onData)
      socket.off('start-session', onStartSession)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  const userList = users.map(user => {
    return <div>{user}</div>
  })

  return (
    <Container> 
      <h2>Hello {userId} on {session}</h2>
      <Paper withBorder style={{padding: '20px'}}>
        <Flex direction="column" align="center">
          <h1>
          SHARE THIS CODE WITH FRIENDS
          </h1>
          <h1>
            {session}
          </h1>
      </Flex>
      </Paper>
        <h1>
          Players 
        </h1>
        <div>
          {userList}
        </div>
      <StartSessionButton user={userId} session={session}/>
     </Container>
    
  );
}