<<<<<<< HEAD
import { PasswordInput } from "@mantine/core";
import DrunkMeter from "../components/DrunkMeter";
=======
import React from 'react';
import ButtonComponent from './ButtonComponent';
import styled from 'styled-components';
>>>>>>> main

// Define a type for the Title component props
interface TitleProps {
  marginLeft?: number,
  marginBottom?: number;
}

// Styled components for the background container
const BackgroundContainer = styled.div`
  background: url('./vector1.png') no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 75vh; /* Adjust the height as needed */
  padding-left: 4vw;
`;

// Styled components for the title container
const TitleContainer = styled.div`
  position: absolute;
  top: 14vw;
  display: flex;
  flex-direction: column;
  height: 300px;
`;

// Styled components for the start container
const StartContainer = styled.div`
  position: absolute;
  top: 35vw;
  left: 60vw;
  width: 40vw;
  height: 100px;
  line-height: 1;
  right: -1vw;
`;

// Styled components for the title
const Title = styled.h1<TitleProps>`
  font-size: 90px;
  color: white;
  font-family: 'Inter', sans-serif;
  text-shadow: 4px 4px 4px black, -4px -4px 4px black, 4px -4px 4px black, -4px 4px 4px black;
  margin: 0; /* Reset the default margin */
  line-height: 1; /* Adjust the line height for tighter spacing */
  margin-left: ${props => (props.marginLeft ? `${props.marginLeft}vw` : '0')}; /* Use a dynamic margin based on the prop */
`;

// Styled components for the catchphrase
const CatchPhrase = styled.p<TitleProps>`
  font-size: 40px;
  color: black;
  font-family: 'Inter', sans-serif;
  text-shadow: 1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, -1px 1px 1px black;
  margin-bottom: ${props => (props.marginBottom ? `${props.marginBottom}vw` : '0')};
`;

// Main component for the home page
export default function HomePage() {
  return (
    <BackgroundContainer>
      <TitleContainer>
        <Title marginLeft={30}>
          HOORAY!
        </Title>
        <Title marginLeft={15}>
          SIP
        </Title>
        <Title marginLeft={0}>
          SIP
        </Title>
      </TitleContainer>

      <StartContainer>
        <CatchPhrase marginBottom={-20}>
          READY TO DRINK RESPONSIBLY? 
          ...OR NOT?
        </CatchPhrase>
        {/* Pass the button text and URL as props */}
        <ButtonComponent buttonText="LET THE GAMES BEGIN" buttonURL="/register" xPos={22} yPos={0} width={35}  height={8} />
      </StartContainer>
      <img src="./graphics1.png" alt="Wine Image" style={{position: 'absolute', top: '38vw', maxWidth: 400,
maxHeight: 400, left: '2vw'}}></img>
    </BackgroundContainer>
  );
}
