import { ChangeEventHandler } from 'react';
import styled from 'styled-components';

type InputProps = {
  isActive?: boolean;
  isEnabled?: string;
  color?: string;
  size?: string;
  column?: boolean;
  isCircle?: boolean;
  isRounded?: boolean;
  type?: 'text' | 'email' | 'number';
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
};

const StyledInput = styled.input<InputProps>`
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
  width: 100%;
  font-size: 2rem;
  justify-content: center;
  margin: 1rem;
`;

const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    isActive,
    isEnabled,
    color,
    type = 'text',
    value,
    defaultValue,
    placeholder,
  } = props;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    if (props.onChange) {
      props.onChange(e);
    }
    if (props.onValueChange) {
      props.onValueChange(value);
    }
  };

  return (
    <StyledInput
      id={props.id}
      isActive={isActive}
      isEnabled={isEnabled}
      color={color}
      type={type}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

type InputLabelProps = {
  htmlFor: string;
  color?: string;
  children: React.ReactNode;
};

const StyledLabel = styled.label<InputLabelProps>`
  color: ${props => props.color || props.theme.colors.textColor};
  font-size: 2rem;
`;

export const InputLabel: React.FC<InputLabelProps> = ({ htmlFor, color, children }) => {
  return (
    <StyledLabel htmlFor={htmlFor} color={color}>
      {children}
    </StyledLabel>
  );
};

export default Input;
