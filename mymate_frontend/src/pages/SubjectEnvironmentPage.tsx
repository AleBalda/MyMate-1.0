import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SubjectEnvironmentPage.module.css';
import SideNav from '../components/Layout/SideNav';
import { FiMic, FiPaperclip, FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import PomodoroWidget from '../components/Subject/PomodoroWidget';
import SubjectFiles from '../components/Subject/SubjectFiles';
import SubjectQuiz from '../components/Subject/SubjectQuiz';
import SubjectRecordings from '../components/Subject/SubjectRecordings';
import avatarImg from '../assets/aavatar.png';

// Dati di esempio (devono corrispondere a quelli in SideNav)
const subjects = [
  { id: 'analisi-matematica-1', name: 'Analisi Matematica I' },
  { id: 'diritto-privato', name: 'Diritto Privato' },
  { id: 'diritto-commerciale', name: 'Diritto Commerciale' },
  { id: 'statistica-1', name: 'Statistica I' },
  { id: 'fisica-generale', name: 'Fisica Generale' },
  { id: 'chimica-inorganica', name: 'Chimica Inorganica' },
  { id: 'economia-politica', name: 'Economia Politica' },
];

// Componente placeholder per la vista Chat
const SubjectChat = ({ subjectName }: { subjectName: string }) => (
    <div className={styles.chatView}>
      <div className={styles.avatarPanel}>
        <img src={avatarImg} alt="AI Avatar" />
        <div className={styles.avatarControls}>
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

// Tipo per le tab
type ActiveTab = 'chat' | 'files' | 'quiz' | 'recordings';

const SubjectEnvironmentPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');

  const currentSubject = subjects.find(s => s.id === subjectId) || { name: 'Subject Not Found' };

  const renderContent = () => {
    switch(activeTab) {
      case 'chat':
        return <SubjectChat subjectName={currentSubject.name} />;
      case 'files':
        return <SubjectFiles />;
      case 'quiz':
        return <SubjectQuiz />;
      case 'recordings':
        return <SubjectRecordings />;
      default:
        return <SubjectChat subjectName={currentSubject.name} />;
    }
  };

  return (
    <div className={styles.pageGrid}>
      <SideNav />
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>{currentSubject.name}</h1>
          </div>
          <nav className={styles.tabs}>
            <button onClick={() => setActiveTab('chat')} className={`${styles.tab} ${activeTab === 'chat' ? styles.active : ''}`}>Chat</button>
            <button onClick={() => setActiveTab('files')} className={`${styles.tab} ${activeTab === 'files' ? styles.active : ''}`}>Files</button>
            <button onClick={() => setActiveTab('quiz')} className={`${styles.tab} ${activeTab === 'quiz' ? styles.active : ''}`}>Quiz</button>
            <button onClick={() => setActiveTab('recordings')} className={`${styles.tab} ${activeTab === 'recordings' ? styles.active : ''}`}>Recordings</button>
          </nav>
          <div className={styles.headerActions}>
            <PomodoroWidget />
            
            {/* Pulsante di registrazione senza logica onClick */}
            <button 
              className={styles.recordButton}
              title="Start Recording"
            >
              <FiMic />
            </button>
          </div>
        </header>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default SubjectEnvironmentPage;