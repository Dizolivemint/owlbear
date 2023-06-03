import styled, { ThemeProvider, createGlobalStyle, css } from 'styled-components';
import { myTheme } from '@/styles/theme';

type ContainerProps = {
  children: React.ReactNode;
  size?: [number, number];
  center?: boolean;
  textCenter?: boolean;
  padding?: string;
  style?: React.CSSProperties;
};

const StyledContainer = styled.div<ContainerProps>`
  color: ${props => props.theme.colors.textColor};
  display: flex;
  flex-direction: column;
  height: ${props => props.size ? props.size[0] : 'auto'};
  width: ${props => props.size ? props.size[1] : '100%'};
  justify-content: ${props => props.center ? 'center' : 'flex-start'};
  align-items: ${props => props.center ? 'center' : 'flex-start'};
  text-align: ${props => props.textCenter ? 'center' : 'left'};
  font-size: calc(10px + 2vmin);
  padding: ${props => props.padding ? props.padding : '0'};
`;

const Container: React.FC<ContainerProps> = (props: ContainerProps) => {
  return (
    <ThemeProvider theme={myTheme}>
      <StyledContainer {...props}>
        {props.children}
      </StyledContainer>
    </ThemeProvider>
  );
};

export default Container;