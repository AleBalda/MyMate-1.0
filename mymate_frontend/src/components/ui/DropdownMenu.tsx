import React, { useEffect, useRef } from 'react';
import styles from './DropdownMenu.module.css';

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose, children }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Questo effetto chiude il menu se l'utente clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={menuRef} className={styles.dropdownMenu}>
      {children}
    </div>
  );
};

export default DropdownMenu;