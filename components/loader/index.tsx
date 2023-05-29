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
  visibility: ${props => (props.showLoader ? 'hidden' : 'visible')};
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
        {children ? children : <div style={{width:'40px', height:'40px'}}></div>}
      </LoadHidden>
    </LoaderWrapper>
  );
};

export default Loader;

