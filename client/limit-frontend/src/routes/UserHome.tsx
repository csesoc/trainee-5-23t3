import ButtonComponent from './ButtonComponent';
import styled from 'styled-components'

const StatBox = styled.div`
    position: absolute;
    height: 20vw;
    width: 100vw;
    left: 0;
    font-family: 'Inter', sans-serif;
    top: 15vw;
    background-color: #FF5E3B;
    color: white;
`
const ProfilePicture = styled.img`
    width: 70%;
    height: 70%;
    border-radius: 50%;
    overflow: hidden; /* Ensure the image stays within the circular boundaries */
`

export default function HomePage() {
    const totalSessions = "slay";
    const maxDrinks = "hi";
    const totalAlc = 34094;

    return (
        <div style={{
            display: 'flex'
        }}>

        <h1 style={{
            color: 'black',
            fontSize: 60,
            fontFamily: 'sans-serif',
            lineHeight: 1.1,
            position: 'absolute',
            left: 200,
        }}>  Welcome, <br/> User </h1>

        <StatBox>
            <div style= {{position: 'absolute', left: 200}}>
            <h1> My Stats </h1>
            <h2> TOTAL SESSIONS: {totalSessions} </h2>
            <h2> MAX DRINKS: {maxDrinks} </h2>
            <h2> TOTAL ALCHOHOL CONSUMED: {totalAlc} litres </h2>
            </div>
            <div style={{position: 'absolute', left: 1100, alignContent: 'center', top: 26}}> <ProfilePicture src="./henry.jpeg" alt="Profile Picture" /> </div>
        </StatBox>

        <ButtonComponent buttonText="Join Session" buttonURL="/joinSession" xPos={40} yPos={10} width={35}  height={8}/>
        <ButtonComponent buttonText="Past Session" buttonURL="/pastSession" xPos={40} yPos={20} width={35}  height={8}/>
        </div>
    );
}

