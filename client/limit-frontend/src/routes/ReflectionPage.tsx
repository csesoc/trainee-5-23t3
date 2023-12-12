// import React from 'react'
import { Link } from 'react-router-dom'
import Sick from '../images/sick.jpg'
import Confused from '../images/confused.jpg'
import Neutral from '../images/neutral.jpg'
import Smile from '../images/smile.jpg'
import Smile2 from '../images/smile2.jpg'

export default function ReflectionPage() {
  return (
    <>
        <h1 
          style={{
            color: '#76B0A2',
            fontFamily: 'Andale Mono, monospace', 
            fontWeight: '900',
            textAlign:'center',
            fontSize: '5vw'
        }}>
            RATE YOUR EXPERIENCE!!
        </h1>

        <h2 
          style={{
            color: 'red',
            fontFamily: 'Andale Mono, monospace', 
            fontWeight: '900',
            fontSize: '2.5vw'
        }}>
            HOW ARE YOU FEELING?
        </h2>

        <Link to="/goodbye">
        <img 
          style={{
            width: '20%',
            height: '20%',
          }} 
          src={Sick} alt='sick'/>
        </Link>

        <Link to="/goodbye">
        <img 
          style={{
            width: '20%',
            height: '20%',
          }} 
          src={Confused} alt='confused'/>
        </Link>

        <Link to="/goodbye">
        <img 
          style={{
            width: '20%',
            height: '20%',
          }} 
          src={Neutral} alt='neutral'/>
        </Link>

        <Link to="/goodbye">
        <img 
          style={{
            width: '20%',
            height: '20%',
          }} 
          src={Smile} alt='smile'/>
        </Link>

        <Link to="/goodbye">
        <img 
          style={{
            width: '20%',
            height: '20%',
          }} 
          src={Smile2} alt='smile2'/>
        </Link>

    </>
  )
}

