// import React from 'react'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'

export default function SessionStart() {
  return (
    // <div>SessionStart</div>
    <>
    <Link to="/mode">
    <Button 
      size="xl"
      variant="gradient"
      gradient={{ from: "#E1341E", to: "#E75D4B", deg: 90 }}
      style={{
        fontSize: '3vw',
      }}>
        BACK
    </Button>
    </Link>

    <Link to="/session">
    <Button
      size="xl"
      variant="gradient"
      gradient={{ from: "#E1341E", to: "#E75D4B", deg: 90 }}
      style={{
          fontSize: '3vw',
          marginLeft: '45vw' 
        }}>
      START
    </Button>
    </Link>
    </>
  )
}
