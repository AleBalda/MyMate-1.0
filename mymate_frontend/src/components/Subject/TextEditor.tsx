import React from 'react';
import styles from './TextEditor.module.css';
import { FiSave, FiX } from 'react-icons/fi';

interface TextEditorProps {
  onClose: () => void; // Funzione per tornare alla vista file
  onSave: (note: { title: string; content: string }) => void; // Funzione per salvare la nota
}

const TextEditor: React.FC<TextEditorProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = React.useState('Untitled Note');
  
  // Funzione fittizia per il salvataggio
  const handleSave = () => {
    onSave({ title: `${title}.note`, content: 'This is the note content.' });
    onClose(); // Torna alla vista file dopo aver salvato
  };

  return (
    <div className={styles.editorContainer}>
      <header className={styles.editorHeader}>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.titleInput}
        />
        <div className={styles.actions}>
          <button className={styles.saveButton} onClick={handleSave}><FiSave /> Save</button>
          <button className={styles.closeButton} onClick={onClose}><FiX /></button>
        </div>
      </header>
      <div className={styles.editorToolbar}>
        {/* Placeholder per i controlli di formattazione (Grassetto, Corsivo, etc.) */}
        <button>B</button>
        <button>I</button>
        <button>U</button>
      </div>
      <textarea 
        className={styles.textArea} 
        placeholder="Start writing your notes here..."
      />
    </div>
  );
};

export default TextEditor;