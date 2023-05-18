import React, { ChangeEventHandler } from 'react';
import styled, { DefaultTheme, ThemedStyledProps } from 'styled-components';

type CheckboxProps = {
  isActive?: boolean;
  isEnabled?: string;
  color?: string;
  size?: string;
  column?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  id?: string;
  children: React.ReactNode;
  isCircle?: boolean;
  isRounded?: boolean;
};

type StyledCheckboxProps = {
  isActive?: boolean;
  isCircle?: boolean;
  isRounded?: boolean;
};

const StyledCheckboxWrapper = styled.label<Pick<CheckboxProps, 'color'>>`
  display: flex;
  align-items: center;
  color: ${(props) => props.color || props.theme.colors.textColor};
`;

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })<StyledCheckboxProps>`
  appearance: none;
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  border: 2px solid
    ${(props) =>
      props.isActive
        ? props.theme.colors.borderColor
        : props.theme.colors.borderColorHighlight};
  border-radius: ${(props) => (props.isCircle ? '50%' : props.isRounded ? '4px' : '0')};
  margin-right: 8px;
  cursor: pointer;

  &:checked {
    background-color: ${(props) => props.theme.colors.borderColor};
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.borderColor};
  }
`;

const CheckboxLabel = styled.span`
  user-select: none;
  cursor: pointer;
`;

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { isActive, color, id, children, onChange } = props;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <StyledCheckboxWrapper color={color}>
      <StyledCheckbox
        isActive={isActive}
        id={id}
        checked={props.isActive}
        onChange={handleChange}
        isCircle={props.isCircle || false}
        isRounded={props.isRounded || false}
      />
      <CheckboxLabel>{children}</CheckboxLabel>
    </StyledCheckboxWrapper>
  );
};

export default Checkbox;