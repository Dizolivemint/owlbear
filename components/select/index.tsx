import { ChangeEventHandler } from 'react';
import styled from 'styled-components';

type SelectProps = {
  isActive?: boolean;
  isEnabled?: string;
  color?: string;
  size?: string;
  column?: boolean;
  isCircle?: boolean;
  isRounded?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  id?: string;
  children: React.ReactNode;
};

const StyledSelect = styled.select<SelectProps>`
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
  margin: 1rem;
`;

const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const { isActive, isEnabled, color, value, defaultValue } = props;

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target;
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <StyledSelect
      id={props.id}
      isActive={isActive}
      isEnabled={isEnabled}
      color={color}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
    >
      {props.children}
    </StyledSelect>
  );
};

type SelectOptionProps = {
  value: string;
  children: React.ReactNode;
};

const SelectOption: React.FC<SelectOptionProps> = ({ value, children }) => {
  return (
    <option value={value}>
      {children}
    </option>
  );
};

type SelectLabelProps = {
  htmlFor: string;
  color?: string;
  children: React.ReactNode;
};

const StyledLabel = styled.label<SelectLabelProps>`
  color: ${props => props.color || props.theme.colors.textColor};
`;

export const SelectLabel: React.FC<SelectLabelProps> = ({ htmlFor, color, children }) => {
  return (
    <StyledLabel htmlFor={htmlFor} color={color}>
      {children}
    </StyledLabel>
  );
};

export default Select;