import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoaderProps {
  showLoader: boolean;
  children: React.ReactNode;
}

const LoaderWrapper = styled.div<LoaderProps>`
  position: relative;
  margin-top: 2rem;
`;

const LoadHidden = styled.div<LoaderProps>`
  display: ${props => (props.showLoader ? 'none' : 'block')};
`;

const LoaderOverlay = styled.div<LoaderProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${props => (props.showLoader ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
`;

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderAnimation = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spinAnimation} 0.8s linear infinite;
`;

const Loader: React.FC<LoaderProps> = ({ showLoader, children }) => {
  return (
    <LoaderWrapper showLoader={showLoader}>
      <LoaderOverlay showLoader={showLoader}>
        <LoaderAnimation />
      </LoaderOverlay>
      <LoadHidden showLoader={showLoader}>
        {children}
      </LoadHidden>
    </LoaderWrapper>
  );
};

export default Loader;

