import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SubjectEnvironmentPage.module.css';
import SideNav from '../components/Layout/SideNav';
import { FiMic, FiPaperclip,  FiMinimize2, FiMaximize2 } from 'react-icons/fi';

// Importa i nuovi componenti per i contenuti delle tab
import PomodoroWidget from '../components/Subject/PomodoroWidget';
import SubjectFiles from '../components/Subject/SubjectFiles';

// Definiamo un componente placeholder per la vista Chat, come era prima
const SubjectChat = ({ subjectName }: { subjectName: string }) => (
    <div className={styles.chatView}>
      <div className={styles.avatarPanel}>
        <img src="https://i.pravatar.cc/300?u=ai-subject" alt="AI Avatar" />
        <div className={styles.avatarControls}>
          <button><FiMinimize2 /></button>
          <button><FiMaximize2 /></button>
        </div>
      </div>
      <div className={styles.chatPanel}>
        <div className={styles.chatHistory}>
          <div className={styles.aiMessage}>Ciao! Sono pronto ad aiutarti con {subjectName}. Chiedimi pure!</div>
        </div>
        <div className={styles.chatInputBar}>
          <input type="text" placeholder={`Chiedi qualcosa su ${subjectName}...`} />
          <button><FiMic /></button>
          <button><FiPaperclip /></button>
          <button className={styles.sendButton}>Send</button>
        </div>
      </div>
    </div>
);

// Dati di esempio (devono corrispondere a quelli in SideNav per il lookup)
const subjects = [
  { id: 'analisi-matematica-1', name: 'Analisi Matematica I' },
  { id: 'diritto-privato', name: 'Diritto Privato' },
  { id: 'diritto-commerciale', name: 'Diritto Commerciale' },
  { id: 'statistica-1', name: 'Statistica I' },
  { id: 'fisica-generale', name: 'Fisica Generale' },
  { id: 'chimica-inorganica', name: 'Chimica Inorganica' },
  { id: 'economia-politica', name: 'Economia Politica' },
];

// Definiamo un tipo per le tab, per maggiore sicurezza del codice
type ActiveTab = 'chat' | 'files' | 'quiz' | 'recordings';

const SubjectEnvironmentPage = () => {
  // Ottiene il parametro :subjectId dall'URL
  const { subjectId } = useParams<{ subjectId: string }>();
  // Stato per tenere traccia di quale tab è attualmente attiva
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat'); // Mostra "Chat" di default

  // Trova i dettagli della materia corrente usando l'ID dall'URL
  const currentSubject = subjects.find(s => s.id === subjectId) || { name: 'Subject Not Found' };

  // Funzione che decide quale componente renderizzare in base alla tab attiva
  const renderContent = () => {
    switch(activeTab) {
      case 'chat':
        return <SubjectChat subjectName={currentSubject.name} />;
      case 'files':
        return <SubjectFiles />;
      // Aggiungeremo i casi per 'quiz' e 'recordings' in futuro
      // Per ora, mostrano un semplice testo come placeholder
      case 'quiz':
        return <div style={{padding: '32px'}}>La sezione Quiz è in arrivo!</div>;
      case 'recordings':
        return <div style={{padding: '32px'}}>La sezione Recordings è in arrivo!</div>;
      default:
        return <SubjectChat subjectName={currentSubject.name} />;
    }
  }

  return (
    <div className={styles.pageGrid}>
      <SideNav />
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h1>{currentSubject.name}</h1>
          <div className={styles.headerActions}>
            <PomodoroWidget />
            <button className={styles.recordButton}><FiMic /></button>
          </div>
        </header>
        
        <nav className={styles.tabs}>
          <button onClick={() => setActiveTab('chat')} className={`${styles.tab} ${activeTab === 'chat' ? styles.active : ''}`}>Chat</button>
          <button onClick={() => setActiveTab('files')} className={`${styles.tab} ${activeTab === 'files' ? styles.active : ''}`}>Files</button>
          <button onClick={() => setActiveTab('quiz')} className={`${styles.tab} ${activeTab === 'quiz' ? styles.active : ''}`}>Quiz</button>
          <button onClick={() => setActiveTab('recordings')} className={`${styles.tab} ${activeTab === 'recordings' ? styles.active : ''}`}>Recordings</button>
        </nav>

        {/* Qui viene renderizzato il contenuto della tab attiva */}
        {renderContent()}
      </div>
    </div>
  );
};

export default SubjectEnvironmentPage;