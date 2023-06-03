import styled from 'styled-components';

type ListProps = {
  direction?: string;
};

const List = styled.ul<ListProps>`
  display: flex;
  flex-direction: ${props => props.direction ? props.direction : 'row'};
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin: 0 0.5rem;
    @media ${props => props.theme.mediaQueries.small} {
      width: 100%;
    }
  }
`;

export default List