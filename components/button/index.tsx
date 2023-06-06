import React from 'react';
import styled, { keyframes } from 'styled-components';

type ButtonProps = {
  children: React.ReactNode;
  isActive?: boolean;
  isEnabled?: string;
  color?: string;
  size?: string;
  column?: boolean;
  isCircle?: boolean;
  isRounded?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const borderAnimation = keyframes`
 0% { border-top: 2px solid #c65802; }
 25% { border-right: 2px solid #c65802; }
 50% { border-bottom: 2px solid #c65802; }
 100% { border-left: 2px solid #c65802; }
`;

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.isEnabled ? props.theme.colors.fg : props.theme.colors.bg};
  border-color: ${(props) =>
    props.isActive ? props.theme.colors.borderColor : props.theme.colors.borderColorHighlight};
  border: 2px solid;
  border-radius: ${(props) => (props.isRounded ? '20px' : '4px')};
  color: ${(props) => props.color || props.theme.colors.textColor};
  padding: 1rem;
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  width: calc(100% - 1rem);
  justify-content: center;
  &:hover {
    cursor: pointer;
    animation-name: ${borderAnimation};
    animation-duration: 4s;
    animation-iteration-count: infinite;
  }
  margin: 1rem;
`;

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { isActive, isEnabled, children, color, onClick } = props;

  return (
    <StyledButton
      isActive={isActive}
      isEnabled={isEnabled}
      color={color}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
