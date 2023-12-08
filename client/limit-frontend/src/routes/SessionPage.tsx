// import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@mantine/core"
import Wine from "../images/wine.jpg"
import Add from "../images/add.png"

export default function SessionPage() {
  return (
    <>
    <img 
      src={Wine} 
      alt="wine"
      style={{
        width:"20%",
        height:"20%"
      }}/>

    <Link to="/modal">
    <img 
      src={Add}
      alt="add"
      style={{
        width:"3%",
        height:"3%"
      }}/>
    </Link>

    <Link to="/reflection">
    <Button 
      size="xl"
      variant="gradient"
      gradient={{ from: "#E1341E", to: "#E75D4B", deg: 90}}
      style={{
          fontSize: "3vw",
          marginLeft: "40vw"
        }}>
      LEAVE
    </Button>
    </Link>
    </>
    // <div>SessionPage</div>
  )
}
