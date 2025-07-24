import React, { useState } from 'react';
import styles from './SubjectRecordings.module.css';
import { FiSearch, FiPlayCircle, FiPauseCircle, FiMoreVertical, FiSkipBack, FiSkipForward, FiVolume2} from 'react-icons/fi';

// Dati di esempio per le registrazioni
const recordings = [
  { title: "Lecture 10 - Lagrange's Theorem", duration: "45:32", date: "2025-09-15" },
  { title: "Lecture 09 - Rolle's Theorem", duration: "52:10", date: "2025-09-13" },
  { title: "Voice Note - Exam Questions", duration: "05:48", date: "2025-09-12" },
  { title: "Lecture 08 - Derivatives", duration: "1:10:23", date: "2025-09-11" },
  { title: "Lecture 07 - Limits and Continuity", duration: "48:15", date: "2025-09-08" },
];

const SubjectRecordings = () => {
  const [activeRecording, setActiveRecording] = useState(0); // Indice della traccia attiva
  const [isPlaying, setIsPlaying] = useState(true); // La prima traccia è in play di default

  return (
    <div className={styles.container}>
      {/* --- Parte Superiore: Lista e Controlli --- */}
      <div className={styles.content}>
        <div className={styles.toolbar}>
          <div className={styles.searchBar}>
            <FiSearch />
            <input type="text" placeholder="Search recordings..." />
          </div>
          <select className={styles.sortDropdown}>
            <option>Sort by: Date</option>
            <option>Sort by: Name</option>
          </select>
        </div>

        <ul className={styles.recordingsList}>
          {recordings.map((rec, index) => (
            <li key={index} className={`${styles.recordingItem} ${index === activeRecording ? styles.active : ''}`}>
              <button className={styles.playButton} onClick={() => { setActiveRecording(index); setIsPlaying(true); }}>
                {index === activeRecording && isPlaying ? <FiPauseCircle /> : <FiPlayCircle />}
              </button>
              <span className={styles.title}>{rec.title}</span>
              <span className={styles.duration}>{rec.duration}</span>
              <span className={styles.date}>{rec.date}</span>
              <button className={styles.optionsButton}><FiMoreVertical /></button>
            </li>
          ))}
        </ul>
      </div>

      {/* --- Parte Inferiore: Player Fisso --- */}
      <footer className={styles.playerBar}>
        <div className={styles.controls}>
          <button><FiSkipBack /></button>
          <button className={styles.playPauseMain} onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <FiPauseCircle size={24}/> : <FiPlayCircle size={24} />}
          </button>
          <button><FiSkipForward /></button>
        </div>
        <div className={styles.scrubber}>
          <span>12:15</span>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: '27%' }}></div>
          </div>
          <span>{recordings[activeRecording].duration}</span>
        </div>
        <div className={styles.volume}>
          <FiVolume2 />
          <input type="range" min="0" max="100" defaultValue="75" />
        </div>
      </footer>
    </div>
  );
};

export default SubjectRecordings;