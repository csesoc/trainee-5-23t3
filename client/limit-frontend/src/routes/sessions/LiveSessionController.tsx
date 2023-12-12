import { ContextType, createContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import LeaderboardPage from "../../components/liveSession/LeaderboardPage";
import SelfSessionPage from "../../components/liveSession/SelfSessionPage";
import { Button } from "@mantine/core";

const userId = Math.floor(Math.random()*1000).toString()

type ActivePageType = "self" | "leaderboard";

export const ActivePageContext = createContext<ActivePageType>("self")

export default function LiveSessionController() {
  let { session } = useParams();
  session = session as string; 
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState<ActivePageType>("self")
  const [userData, setUserData] = useState([10,20,30])
  const [funct, setFunct] = useState<Function>(() => (data: any) => console.log(data))

  const handleClick = () => {
    if (activePage == "self") {
      setActivePage("leaderboard");
    } else {
      setActivePage("self");
    }
  }

  const [users, setUsers] = useState<string[]>([]);
  useEffect(() => {
    const socket = io("http://localhost:6969/live", {
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
      setUserData(data)
      console.log(data)
    }

    function onEndSession() {
      socket.disconnect()
      navigate('/')
    }

    function onDisconnect() {
      navigate('/')
    }

    const emitData = (data: any) => {
      socket.emit('data', data)
    }

    setFunct(() => emitData)

    socket.on('connect', onConnect)
    socket.on('message', onMessage)
    socket.on('data', onData)
    socket.on('end-session', onEndSession)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('message', onMessage)
      socket.off('data', onData)
      socket.off('end-session', onEndSession)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <>
    {
      activePage == "self" ? <SelfSessionPage userData={userData} emitData={funct}/> :
      activePage == "leaderboard" ? <LeaderboardPage userDataList={userData}/> :
      undefined
    }
      <Button variant="filled" onClick={handleClick}>
        {activePage == "self" ? "Go to leadboard" : "Go to your page"}
      </Button>
    </>
  );
}