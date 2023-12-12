// import React from 'react'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'

export default function GoodbyePage() {

  return (
    <>
      <h2 
        style={{
          textAlign: 'center'
      }}>
        Well hopefully you had a great time and hopefully we will see you again
      </h2>
      <h2 
          style={{
            textAlign: 'center'
      }}>
        PLEASE LOOK AFTER YOURSELF PLSSS 😫
      </h2>

      <Link to='/'>
      <Button 
        variant="gradient" 
        gradient={{ from: 'red', to: 'pink', deg: 90 }}
        // size='xs'
        style={{
          marginLeft:'45%',
        }}>
        Return to Home
      </Button>
      </Link>
      {/* include a button to link back to the landing page */}
    </>
  )
}
