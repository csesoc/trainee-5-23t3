import { Button, Center, Container, Flex, Paper, TextInput } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const BackgroundBox = styled.div`
    background-image: url(./background.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -100;
    background-attachment: fixed;
`;

const CenterBox = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    background: transparent;
    background: linear-gradient(to bottom, rgba(255, 0, 0, 0.5), rgba(255, 255, 255, 0.5));
    transform: translate(-50%, -50%);
    padding: 20px 20px;
`;


const JoinSessionBox = styled.div`
    background-color: white;
    position: center;
    padding: 1vw 2vh;
    font-size: 30px;
    font-weight: 700;
    min-width: 40vw;
    min-height: 1vh;
`;

const BoxTitle = styled.div`
    text-align: center;
    margin-bottom: 4vh;
`

const BackBtn = styled.button`
    background-color: #e05444;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 10px 60px 10px 60px;
    box-shadow: 0px 4px 13px #e05444;
    cursor: pointer;
    text-decoration: none;
    margin: 20px;
    width: 9vw;
    height: 6vh;
    text-align: center;
    font-size: 15px;

    &:hover {
        background-color: #ff6b4d;
        transition: background-color 0.3s
    }
`

const JoinBtn = styled.button`
    margin-top: 30px;
    background-color: #e05444;
    border-radius: 10px;
    border: none;
    color: white;
    width: 100%;
    letter-spacing: 4px;
    cursor: pointer;

    &:hover {
        background-color: #ff6b4d;
        transition: background-color 0.3s
    }

    &:disabled {
        cursor: default;
    }
`

export default function JoinSessionPage() {
    const [value, setValue] = useState('');
    const [isClickable, setIsClickable] = useState(false);
    const navigate = useNavigate(); 

    function isFourDigitNumber(str: string) {
        return /^\d{4}$/.test(str);
    }
    
    if (isFourDigitNumber(value)) {
        setIsClickable(true);
    }

    return (
        <>
            <BackgroundBox/>
                <CenterBox>
                    <JoinSessionBox>
                        <BoxTitle>Join a Room</BoxTitle>
                        <TextInput
                            size="md"
                            radius="md"
                            placeholder="Enter 4 digit code"
                            label="Session Code"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            style={{width: "100%", marginTop: '10px'}}
                            error={false}
                        />
                        <JoinBtn 
                            onClick={e => {
                                if (isClickable) {
                                    navigate(`/join/${value}`)
                                }
                            }}
                            >
                            Sip
                        </JoinBtn>
                    </JoinSessionBox>
                </CenterBox>
            <BackBtn onClick={() => window.history.back()}>Back</BackBtn>
        </>
    );
}