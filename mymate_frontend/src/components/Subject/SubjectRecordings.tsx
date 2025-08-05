import React, { useState, useMemo, useRef } from 'react';
import styles from './SubjectRecordings.module.css';
import { 
  FiSearch, FiUploadCloud, FiMic, FiPlayCircle, FiPauseCircle, 
  FiMoreVertical, FiSkipBack, FiSkipForward, FiVolume2,
  FiEdit, FiDownload, FiTrash2, FiShare2
} from 'react-icons/fi';

import DropdownMenu from '../ui/DropdownMenu';
import RecordingStudio from './RecordingStudio'; 

// Definiamo un tipo per le registrazioni
interface RecordingItem {
  title: string;
  duration: string;
  date: string;
  audioURL: string; // URL locale per la riproduzione
}

// Dati iniziali di esempio
const initialRecordings: RecordingItem[] = [
  { title: "Lecture 10 - Lagrange's Theorem", duration: "45:32", date: "2025-09-15", audioURL: "" },
  { title: "Lecture 09 - Rolle's Theorem", duration: "52:10", date: "2025-09-13", audioURL: "" },
  { title: "Voice Note - Exam Questions", duration: "05:48", date: "2025-09-12", audioURL: "" },
  { title: "Lecture 08 - Derivatives", duration: "1:10:23", date: "2025-09-11", audioURL: "" },
  { title: "Lecture 07 - Limits and Continuity", duration: "48:15", date: "2025-09-08", audioURL: "" },
];

type SortKey = 'title' | 'date';
type SortOrder = 'asc' | 'desc';

const SubjectRecordings = () => {
  const [view, setView] = useState<'list' | 'studio'>('list'); // Stato per cambiare vista
  const [allRecordings, setAllRecordings] = useState(initialRecordings);
  
  const [activeRecordingIndex, setActiveRecordingIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null); // Riferimento al player audio

  const processedRecordings = useMemo(() => {
    let filtered = allRecordings.filter(rec =>
      rec.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const key = sortKey === 'date' ? 'date' : 'title';
      if (a[key] < b[key]) return sortOrder === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, sortKey, sortOrder, allRecordings]);

  const toggleMenu = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  
  const handleSaveRecording = (newRec: { title: string, blob: Blob }) => {
    const newRecordingItem: RecordingItem = {
      title: newRec.title,
      duration: "--:--", // La durata reale andrebbe calcolata dal blob audio
      date: new Date().toISOString().split('T')[0],
      audioURL: URL.createObjectURL(newRec.blob) // Creiamo un URL locale per la riproduzione immediata
    };
    setAllRecordings([newRecordingItem, ...allRecordings]);
  };

  const handlePlayPause = (index: number) => {
    if (index === activeRecordingIndex) { // Clic su traccia già attiva
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    } else { // Clic su una nuova traccia
      setActiveRecordingIndex(index);
      if (audioRef.current) {
        audioRef.current.src = processedRecordings[index].audioURL;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const renderRecordingMenu = (index: number) => (
    <DropdownMenu isOpen={openMenuIndex === index} onClose={() => setOpenMenuIndex(null)}>
      <button className={styles.menuItem}><FiEdit/> Rename</button>
      <button className={styles.menuItem}><FiDownload/> Download</button>
      <button className={styles.menuItem}><FiShare2/> Share</button>
      <div className={styles.menuDivider}></div>
      <button className={`${styles.menuItem} ${styles.danger}`}><FiTrash2/> Delete</button>
    </DropdownMenu>
  );

  // Se la vista è 'studio', mostra l'interfaccia di registrazione
  if (view === 'studio') {
    return <RecordingStudio onClose={() => setView('list')} onSave={handleSaveRecording} />;
  }

  // Altrimenti, mostra la lista delle registrazioni
  return (
    <div className={styles.container}>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      
      <div className={styles.content}>
        <div className={styles.toolbar}>
          <div className={styles.searchBar}>
            <FiSearch />
            <input type="text" placeholder="Search recordings..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className={styles.sortControls}>
            <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Name</option>
            </select>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as SortOrder)}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
          <div className={styles.actions}>
            <button className={styles.primaryButton}><FiUploadCloud /> Upload File</button>
            <button className={styles.secondaryButton} onClick={() => setView('studio')}><FiMic /> New Recording</button>
          </div>
        </div>

        {processedRecordings.length > 0 ? (
          <ul className={styles.recordingsList}>
            {processedRecordings.map((rec, index) => (
              <li key={index} className={`${styles.recordingItem} ${index === activeRecordingIndex ? styles.active : ''}`}>
                <button className={styles.playButton} onClick={() => handlePlayPause(index)}>
                  {index === activeRecordingIndex && isPlaying ? <FiPauseCircle /> : <FiPlayCircle />}
                </button>
                <span className={styles.title}>{rec.title}</span>
                <span className={styles.duration}>{rec.duration}</span>
                <span className={styles.date}>{rec.date}</span>
                <div className={styles.optionsCell}>
                  <button className={styles.optionsButton} onClick={() => toggleMenu(index)}><FiMoreVertical /></button>
                  {renderRecordingMenu(index)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <h3>No recordings found</h3>
            <p>Click "New Recording" to start a new audio note or lecture recording.</p>
          </div>
        )}
      </div>

      {activeRecordingIndex !== null && (
        <footer className={styles.playerBar}>
          <div className={styles.controls}>
            <button><FiSkipBack /></button>
            <button className={styles.playPauseMain} onClick={() => handlePlayPause(activeRecordingIndex)}>
              {isPlaying ? <FiPauseCircle size={24}/> : <FiPlayCircle size={24} />}
            </button>
            <button><FiSkipForward /></button>
          </div>
          <div className={styles.scrubber}>
            <span>0:00</span>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar} style={{ width: '0%' }}></div>
            </div>
            <span>{processedRecordings[activeRecordingIndex]?.duration || '--:--'}</span>
          </div>
          <div className={styles.volume}>
            <FiVolume2 />
            <input type="range" min="0" max="100" defaultValue="75" />
          </div>
        </footer>
      )}
    </div>
  );
};

export default SubjectRecordings;