import { PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from 'react';
import ButtonComponent from '../ButtonComponent';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  background: url('./Register_Background.png') no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 60vw; /* Adjust the height as needed */
  padding-left: 4vw;
`;

const RegistrationWrapper = styled.div`
    position: absolute;
    background-color: white;
    top: 35%;
    width: 30vw;
    height: 32vw;
    padding: 2vw;
    box-shadow: 8px 8px 8px red, -8px -8px 8px red, 8px -8px 8px red, -8px 8px 8px red;
`

export default function HomePage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    return (
        <BackgroundContainer>
        
        <RegistrationWrapper>
        <h1 style={{textAlign: "center"}}> Register </h1>
        <TextInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
        />
        <TextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <PasswordInput
            placeholder="Password"
            label="Password"
            description="Password must include at least one letter, number and special character"
            radius="md"
            required
        />
        <ButtonComponent buttonText="Sip" buttonURL="/home" xPos={2} yPos={0} width={26} height={5}/>
        </RegistrationWrapper>
        </BackgroundContainer>
    );
}