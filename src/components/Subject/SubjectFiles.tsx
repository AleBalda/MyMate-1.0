import React, { useState } from 'react';
import styles from './SubjectFiles.module.css';
import { FiSearch, FiUploadCloud, FiPlus, FiGrid, FiList, FiFileText, FiImage, FiMoreVertical } from 'react-icons/fi';

// Dati di esempio per i file
const files = [
  { name: 'Appunti Lezione 5.pdf', type: 'pdf' },
  { name: 'Esercizi Derivate.pdf', type: 'pdf' },
  { name: 'Lavagna Limiti.jpg', type: 'image' },
  { name: 'Spiegazione Integrali.pdf', type: 'pdf' },
  { name: 'Teorema di Rolle.pdf', type: 'pdf' },
  { name: 'Formulario completo.pdf', type: 'pdf' },
  { name: 'Appunti Personali.docx', type: 'doc' },
];

const SubjectFiles = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className={styles.filesContainer}>
      <div className={styles.toolbar}>
        <div className={styles.searchBar}>
          <FiSearch />
          <input type="text" placeholder="Search files..." />
        </div>
        <div className={styles.actions}>
          <button className={styles.primaryButton}><FiUploadCloud /> Upload File</button>
          <button className={styles.secondaryButton}><FiPlus /> New Note</button>
          <div className={styles.viewToggle}>
            <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? styles.active : ''}><FiGrid /></button>
            <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? styles.active : ''}><FiList /></button>
          </div>
        </div>
      </div>

      <div className={styles.fileGrid}>
        {files.map((file, index) => (
          <div key={index} className={styles.fileCard}>
            <div className={styles.thumbnail}>
              {file.type === 'image' ? <FiImage size={40} /> : <FiFileText size={40} />}
            </div>
            <span className={styles.fileName}>{file.name}</span>
            <button className={styles.optionsButton}><FiMoreVertical /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectFiles;