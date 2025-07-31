//Modal.tsx è un componente "cornice" generico e riutilizzabile per qualsiasi finestra pop-up. Il suo unico compito è 
// creare lo sfondo oscurato e il riquadro bianco con il pulsante di chiusura. Riceve dall'esterno le istruzioni 
// su quando mostrarsi (isOpen) e cosa mostrare al suo interno (children), rendendo il codice pulito e non ripetitivo.

import React from 'react';
import styles from './Modal.module.css';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Chiude la modale solo se si clicca sull'overlay e non sul contenuto
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;