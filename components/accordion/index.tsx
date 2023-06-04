import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface AccordionProps {
  imageUrl: string | undefined;
  title: string | undefined | null;
  children: React.ReactNode;
}

const AccordionContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const AccordionButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const AccordionTitle = styled.h3`
  margin: 0;
  margin-left: 10px;
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  padding: 10px;
`;

const AccordionIcon = styled.span`
  margin-left: 1rem;
  font-size: 1.5rem;
`;

const Accordion: React.FC<AccordionProps> = (props: AccordionProps = {
  imageUrl: '',
  title: '',
  children: null
}) => {
  const { imageUrl, title, children } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionContainer>
      <AccordionButton onClick={handleClick}>
        {imageUrl && 
          <Image src={imageUrl} alt="Accordion" style={{borderRadius: '50%'}} height={30} width={30} />
        }
        <AccordionTitle>{title}</AccordionTitle>
        <AccordionIcon>{isOpen ? '-' : '+'}</AccordionIcon>
      </AccordionButton>
      <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
    </AccordionContainer>
  );
};

export default Accordion;