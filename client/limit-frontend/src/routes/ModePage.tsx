// import React from 'react'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'

export default function ModePage() {
  return (
    <>
    <h3 style={{
      color: '#4E0106',
      textAlign:'center',
      fontFamily: 'Marker Felt, fantasy',
      fontSize: '6vw'
    }}>
        Time to have some fun...
    </h3>

    <Link to="/start">
    <Button 
      size='xl'
      variant="gradient" 
      gradient={{ from: '#4E0106', to: '#81020B', deg: 90 }}
      style={{
        marginLeft:'30%',
        fontSize:'5vw',
        fontFamily: 'Marker Felt, fantasy',
        color:'black'
      }}>
        WACK MODE
    </Button>
    </Link>
    </>
  )
}
