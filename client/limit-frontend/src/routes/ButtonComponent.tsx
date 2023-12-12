import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ButtonComponentProps {
  buttonText: string;
  buttonURL: string;
  xPos: number;
  yPos: number;
  width: number;
  height: number;
}

const StyledButton = styled.button<ButtonComponentProps>`
  font-size: 40px;
  color: white;
  background-color: #AC0F18;
  font-family: 'Inter', sans-serif;
  position: relative;
  width: ${(props) => props.width}vw; // Use props.width to access the width prop
  height: ${(props) => props.height}vw; // Use props.height to access the height prop
  top: ${(props) => props.xPos}vw; // Use props.xPos to access the xPos prop
  left: ${(props) => props.yPos}vw; // Use props.yPos to access the yPos prop
`;

const ButtonComponent: React.FC<ButtonComponentProps> = ({ buttonText, buttonURL, xPos, yPos, width, height }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to another page
    navigate(buttonURL);
  };

  return (
    <StyledButton onClick={handleClick} xPos={xPos} yPos={yPos} width={width} height={height}>
      {buttonText}
    </StyledButton>
  );
};

export default ButtonComponent;

