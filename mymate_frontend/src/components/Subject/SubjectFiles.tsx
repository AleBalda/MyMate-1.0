import React, { useState, useMemo } from 'react';
import styles from './SubjectFiles.module.css';
import { 
  FiSearch, FiUploadCloud, FiPlus, FiGrid, FiList, FiFileText, 
  FiImage, FiMoreVertical, FiEdit, FiDownload, FiTrash2, FiShare2
} from 'react-icons/fi';

import DropdownMenu from '../ui/DropdownMenu';
import TextEditor from './TextEditor';

// Definiamo un tipo per i nostri file
interface FileItem {
  name: string;
  type: 'pdf' | 'image' | 'doc' | 'note';
  lastModified: string; // Usiamo date in formato YYYY-MM-DD per un ordinamento corretto
  size: string;
}

// Dati iniziali dei file (con date formattate per l'ordinamento)
const initialFiles: FileItem[] = [
  { name: 'Appunti Lezione 5.pdf', type: 'pdf', lastModified: '2025-10-28', size: '2.3 MB' },
  { name: 'Esercizi Derivate.pdf', type: 'pdf', lastModified: '2025-10-27', size: '1.1 MB' },
  { name: 'Lavagna Limiti.jpg', type: 'image', lastModified: '2025-10-25', size: '4.5 MB' },
  { name: 'Spiegazione Integrali.pdf', type: 'pdf', lastModified: '2025-10-22', size: '3.0 MB' },
  { name: 'Teorema di Rolle.pdf', type: 'pdf', lastModified: '2025-10-22', size: '850 KB' },
  { name: 'Formulario completo.pdf', type: 'pdf', lastModified: '2025-10-15', size: '5.2 MB' },
  { name: 'Appunti Personali.docx', type: 'doc', lastModified: '2025-10-08', size: '150 KB' },
];

// Definiamo i tipi per le opzioni di ordinamento
type SortKey = 'name' | 'lastModified';
type SortOrder = 'asc' | 'desc';

const SubjectFiles = () => {
  const [view, setView] = useState<'files' | 'editor'>('files');
  const [allFiles, setAllFiles] = useState(initialFiles);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  // Stati per gestire l'ordinamento
  const [sortKey, setSortKey] = useState<SortKey>('lastModified');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc'); // Di default: dal più recente

  // Logica combinata di filtraggio e ordinamento
  const processedFiles = useMemo(() => {
    // 1. Filtra per ricerca
    let filtered = allFiles.filter(file =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Ordina i risultati filtrati
    filtered.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, allFiles, sortKey, sortOrder]);

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleSaveNote = (note: { title: string; content: string }) => {
    const newNote: FileItem = {
      name: note.title.endsWith('.note') ? note.title : `${note.title}.note`,
      type: 'note',
      lastModified: new Date().toISOString().split('T')[0], // Data odierna
      size: `${Math.ceil(note.content.length / 1024)} KB`
    };
    setAllFiles([newNote, ...allFiles]);
  };

  const renderFileMenu = (fileIndex: number) => (
    <DropdownMenu isOpen={openMenuIndex === fileIndex} onClose={() => setOpenMenuIndex(null)}>
      <button className={styles.menuItem}><FiEdit/> Rename</button>
      <button className={styles.menuItem}><FiDownload/> Download</button>
      <button className={styles.menuItem}><FiShare2/> Share</button>
      <div className={styles.menuDivider}></div>
      <button className={`${styles.menuItem} ${styles.danger}`}><FiTrash2/> Delete</button>
    </DropdownMenu>
  );

  if (view === 'editor') {
    return <TextEditor onClose={() => setView('files')} onSave={handleSaveNote} />;
  }

  return (
    <div className={styles.filesContainer}>
      <div className={styles.toolbar}>
        <div className={styles.searchBar}>
          <FiSearch />
          <input 
            type="text" 
            placeholder="Search files..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.sortControls}>
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
            <option value="lastModified">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as SortOrder)}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <div className={styles.actions}>
          <button className={styles.primaryButton}><FiUploadCloud /> Upload File</button>
          <button className={styles.secondaryButton} onClick={() => setView('editor')}>
            <FiPlus /> New Note
          </button>
          <div className={styles.viewToggle}>
            <button onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? styles.active : ''} title="Grid View"><FiGrid /></button>
            <button onClick={() => setViewMode('list')} className={viewMode === 'list' ? styles.active : ''} title="List View"><FiList /></button>
          </div>
        </div>
      </div>

      {processedFiles.length > 0 ? (
        viewMode === 'grid' ? (
          <div className={styles.fileGrid}>
            {processedFiles.map((file, index) => (
              <div key={`${file.name}-${index}`} className={styles.fileCard}>
                <div className={styles.thumbnail}>
                  {file.type === 'image' ? <FiImage size={40} /> : <FiFileText size={40} />}
                </div>
                <span className={styles.fileName}>{file.name}</span>
                <button className={styles.optionsButton} onClick={() => toggleMenu(index)}>
                  <FiMoreVertical />
                </button>
                {renderFileMenu(index)}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.fileList}>
            <div className={`${styles.fileRow} ${styles.listHeader}`}>
              <span>Name</span>
              <span>Last Modified</span>
              <span>File Size</span>
              <span></span>
            </div>
            {processedFiles.map((file, index) => (
              <div key={`${file.name}-${index}`} className={styles.fileRow}>
                <div className={styles.fileNameCell}>
                  <div className={styles.listIcon}>
                    {file.type === 'image' ? <FiImage /> : <FiFileText />}
                  </div>
                  <span>{file.name}</span>
                </div>
                <span>{file.lastModified}</span>
                <span>{file.size}</span>
                <div className={styles.optionsCell}>
                  <button className={styles.optionsButton} onClick={() => toggleMenu(index)}>
                    <FiMoreVertical />
                  </button>
                  {renderFileMenu(index)}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className={styles.emptyState}>
            <h3>No files found for "{searchTerm}"</h3>
            <p>Try searching for something else or upload a new file.</p>
        </div>
      )}
    </div>
  );
};

export default SubjectFiles;