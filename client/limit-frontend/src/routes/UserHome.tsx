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

const SmallProfilePicture = styled.div`
    width: 2vw;
    height: 2vw;
    position: absolute;
    top: 1.5vw;
    left: 1vw;
    align-items: center;
    border-radius: 50%;
    background-color: black;
`

const PastSessions = styled.div`
    background-color: #D9D9D9;
    position: relative;
    left: 40vw;
    top: 40vw;
    width: 60vw;
    font-family: 'Inter', sans-serif;
`
const Feed = styled.div`
    background-color: #D9D9D9;
    position: relative;
    left: -40vw;
    top: 50vw;
    width: 110vw;
    font-family: 'Inter', sans-serif;
`
const PostHeader = styled.div`
    background-color: #9E9694;
    position: absolute;
    height: 5vw;
    width: 47.2vw;
`

export default function HomePage() {
    const totalSessions = 40;
    const maxDrinks = 3;
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

        <ButtonComponent buttonText="Join Session" buttonURL="/joinSession" xPos={40} yPos={15} width={30}  height={8}/>
        <ButtonComponent buttonText="Past Session" buttonURL="/pastSession" xPos={40} yPos={16} width={30}  height={8}/>

        <PastSessions>
            <h2 style= {{fontSize: 30, position:'relative', textAlign: 'center'}}> PAST SESSIONS</h2>
            <h3 style= {{fontSize: 20, position:'relative', left: 80}}> FRIDAY 13TH AUGUST </h3>
            <h4 style= {{fontSize: 15, position:'relative', left: 80}}> 
            STATUS: WASTED
            <br/>
            DRUNK-O-METER: 98
            <br/>
            DRINKS: 10</h4> <h3 style= {{fontSize: 20, position:'relative', left: 80}}> MONDAY 13TH NOVEMBER </h3>
            <h4 style= {{fontSize: 15, position:'relative', left: 80}}> 
            STATUS: RESPONSIBLE
            <br/>
            DRUNK-O-METER: 20
            <br/>
            DRINKS:2
            </h4>
        </PastSessions>
        <Feed>
            <h2 style= {{fontSize: 30, position:'relative', textAlign: 'center'}}> FEED </h2>
            <div style={{backgroundColor: '#9E9694'}}> </div>
            <PostHeader> 
                <SmallProfilePicture></SmallProfilePicture>
                <h3 style={{position: 'relative', left: 50}}> dylanlovesdogs </h3> </PostHeader>
                <h4 style= {{fontSize: 15, position:'relative', left: 50, top: 90}}> WOKE UP SO HANGOVER :(</h4>(<h4/>
        </Feed>
        </div>
    );
}

