import React, { useState } from 'react';
import styled from 'styled-components';

// Import the Button component
import Button from '@/components/button';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 4px;
  color: #000;
  border: 0.25rem solid #ff7600;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ConfirmationButton = styled(Button)`
  margin-left: 1rem;
  background: #460000;
`;

type CustomButtonProps = {
  modalText: string;
  onConfirm: () => void;
  children: React.ReactNode;
};

const CustomButton: React.FC<CustomButtonProps> = ({ children, modalText, onConfirm }) => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirmation = () => {
    // Run the function provided in the prop
    onConfirm();

    // Close the modal
    setShowModal(false);
  };

  const handleCancel = () => {
    // Close the modal
    setShowModal(false);
  };

  return (
    <div>
      {/* Button to open the modal */}
      <Button onClick={() => setShowModal(true)}>{children}</Button>

      {/* Modal */}
      {showModal && (
        <ModalContainer>
          <ModalContent>
            <p>{modalText}</p>
            <ModalButtonContainer>
              {/* Confirmation button */}
              <ConfirmationButton onClick={handleConfirmation}>Confirm</ConfirmationButton>
              {/* Cancel button */}
              <Button onClick={handleCancel}>Cancel</Button>
            </ModalButtonContainer>
          </ModalContent>
        </ModalContainer>
      )}
    </div>
  );
};

export default CustomButton;
